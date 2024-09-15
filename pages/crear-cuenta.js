import {
  Formulario,
  Campo,
  InputSubmit,
  ErrorMostrar,
} from "../components/ui/Formulario";
import Layout from "../components/layout/Layout";
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import firebase from "../firebase";
import Router from "next/router";
//Validaciones
import useValidacion from "../Hooks/useValidacion";
import validarCrearCuenta from "../Validacion/validarCrearCuenta";
import departamentos from "../data/departamentos.json";
import provincias from "../data/provincias.json";
import distritos from "../data/distritos.json";
const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
  telefono: "",
  department: "",
  province: "",
  district: "",
};

const crearCuenta = () => {
  const [error, guardarError] = useState(false);
  const [imagen, setImagen] = useState("");
  const crearCuenta = async () => {
    try {
      await firebase.registrar(
        nombre,
        email,
        password,
        imagen,
        telefono,
        department,
        province,
        district
      );
      Router.push("/");
    } catch (error) {
      console.error("hubo un error al crear el usuario", error.message);
      guardarError(error.message);
    }
  };
  const { valores, errores, handleSumit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
  //OnBlur -> cuando salgo del input lo valida sin la necesidad de presion el boton de crear cuenta
  const { nombre, email, password, telefono, department, province, district } =
    valores;
  const [distritosPeru, setDistritos] = useState([]);
  const [provinciasPeru, setProvincias] = useState([]);
  //resultados de la api
  const [departamento, setDepartamento] = useState({});
  const [provincia, setProvincia] = useState({});
  const [distrito, setDistrito] = useState("");
  const obtenerProvincias = async (idDepartamento) => {
    const provinciasFiltradas = await provincias.filter(
      (provincia) => provincia.department_id === idDepartamento
    );
    setProvincias(provinciasFiltradas);
  };
  const obtenerDistritos = async (idProvincia) => {
    const distritosFiltrados = await distritos.filter(
      (distrito) => distrito.province_id === idProvincia
    );
    setDistritos(distritosFiltrados);
  };
  useEffect(() => {
    if (departamento.id) {
      obtenerProvincias(departamento.id);
    }
  }, [departamento]);

  const handleChangeDepartamento = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setDepartamento({});
      return;
    }
    const selectedDepartamento = departamentos.find(
      (dep) => dep.name === selectedValue
    );
    setDepartamento({
      name: selectedValue,
      id: selectedDepartamento.id,
    });
  };
  const handleChangeProvincia = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setProvincia({});
      return;
    }
    const selectedProvincia = provinciasPeru.find(
      (provincia) => provincia.name === selectedValue
    );

    setProvincia({
      name: selectedValue,
      id: selectedProvincia.id,
    });
    obtenerDistritos(selectedProvincia.id);
  };

  const handleChangeDistrito = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setDistrito("");
      return;
    }
    setDistrito(selectedValue);
  };

  return (
    <div>
      <Layout>
        <div
          css={css`
            color: white;
            @media (min-width: 1000px) {
              margin-left: 300px;
            }
          `}
        >
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Crear Cuenta
          </h1>
          <Formulario onSubmit={handleSumit} noValidate>
            {errores.nombre && <ErrorMostrar>{errores.nombre}</ErrorMostrar>}
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu Nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.email && <ErrorMostrar>{errores.email}</ErrorMostrar>}
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu Email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && (
              <ErrorMostrar>{errores.password}</ErrorMostrar>
            )}
            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Tu Password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.telefono && (
              <ErrorMostrar>{errores.telefono}</ErrorMostrar>
            )}
            <Campo>
              <label htmlFor="telefono">Telefono</label>
              <input
                type="telefono"
                id="telefono"
                name="telefono"
                placeholder="Tu telefono"
                value={telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={9}
              />
            </Campo>
            {errores.departamento && (
              <ErrorMostrar>{errores.departamento}</ErrorMostrar>
            )}
            <Campo>
              <label htmlFor="departamento">Departamento</label>

              <select
                value={department}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={handleChangeDepartamento}
                name="department"
              >
                <option value="">-- Seleccione --</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.id} value={departamento.name}>
                    {departamento.name}
                  </option>
                ))}
              </select>
            </Campo>

            {departamento.id && (
              <>
                {errores.provincia && (
                  <ErrorMostrar>{errores.provincia}</ErrorMostrar>
                )}
                <Campo>
                  <label htmlFor="provincia">Provicia</label>

                  <select
                    value={province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={handleChangeProvincia}
                    name="province"
                  >
                    <option value="">-- Seleccione --</option>
                    {provinciasPeru.map((provincia) => (
                      <option key={provincia.id} value={provincia.name}>
                        {provincia.name}
                      </option>
                    ))}
                  </select>
                </Campo>
              </>
            )}

            {provincia.id && (
              <>
                {errores.distrito && (
                  <ErrorMostrar>{errores.distrito}</ErrorMostrar>
                )}
                <Campo>
                  <label htmlFor="distrito">Distrito</label>

                  <select
                    value={district}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={handleChangeDistrito}
                    name="district"
                  >
                    <option value="">-- Seleccione --</option>
                    {distritosPeru.map((distrito) => (
                      <option key={distrito.id} value={distrito.name}>
                        {distrito.name}
                      </option>
                    ))}
                  </select>
                </Campo>
              </>
            )}

            {errores.imagen && <ErrorMostrar>{errores.imagen}</ErrorMostrar>}
            <Campo>
              <label htmlFor="imagen">Imagen</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={(e) => {
                  setImagen(e.target.files[0]);
                }}
              />
            </Campo>
            {error && <ErrorMostrar>{error}</ErrorMostrar>}
            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </div>
      </Layout>
    </div>
  );
};

export default crearCuenta;

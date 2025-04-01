import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FirebaseContext } from "@/firebase";
import Router from "next/router";
import Spinner from "../ui/Spinner";
import { ErrorMostrar } from "../ui/Formulario";
import { iniciarSesion } from "@/utils/loginUser";

const Contenedor = styled.div`
  background-color: var(--contCard);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  img {
    width: 160px;
    @media (max-width: 500px) {
      width: 100px;
    }
  }

  .caja1 {
    background-color: var(--fondoBilletera);
    min-width: 300px;
    height: 400px;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 500px) {
      scale: 0.8;
      position: relative;
      top: -40px;
    }
  }

  .botones {
    height: 85%;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .teclas {
    width: 100%;
    height: 60px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-evenly;

    @media (max-width: 1000px) {
      height: 70px;
    }
  }
  .teclas1 {
    width: 85px;
    height: 50px;
    border-radius: 15px;
    font-size: 30px;
    color: #e7e6e8;
    border: solid 2px var(--botonesContorno);
    cursor: pointer;
    background-color: var(--botonesBilletera);
    :hover {
      background-color: rgb(0, 0, 0, 0.7);
    }
  }
  .panelContra {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 30px;
    div {
      height: 10px;
      width: 10px;
      border-radius: 50px;
      background-color: #cbcacc;
    }
  }
  .pintado {
    background-color: var(--botonesContorno) !important;
  }
  img {
    margin-bottom: 10px;
  }
  .nuevoRegistro {
    color: white;
    margin-top: 10px;
    a {
      color: blue;
    }
  }
`;
const LoginBilletera = () => {
  const [clave, guardarClave] = useState("");
  const { firebase, usuario } = useContext(FirebaseContext);
  const [error, guardarError] = useState();
  const [pase, guardarPase] = useState(false);
  // Actualizar círculos al cambiar la clave
  useEffect(() => {
    const circuloContra = document.querySelectorAll(".circuloContra");

    for (let i = 0; i < circuloContra.length; i++) {
      circuloContra[i].classList.toggle("pintado", i < clave.length);
    }
  }, [clave]);

  const enviarClave = async (e) => {
    if (clave.length < 6) {
      const nuevo = clave + e.target.value;
      if (nuevo.length < 6) {
        guardarClave(nuevo);
        return;
      }
      if (nuevo.length == 6) {
        guardarClave(nuevo);
        guardarPase(true);
        const response = await iniciarSesion("luisSantos@gmail.com", nuevo);
        if (response.success) {
          guardarError("");
          guardarClave("");
          setTimeout(() => {
            guardarPase(false);
            Router.push(`/usuarios/${response.token}`);
          }, 1000);
        } else {
          guardarError(response.message);
          guardarPase(false);
          setTimeout(() => {
            guardarError("");
            guardarClave("");
          }, 1500);
        }
        return;
      }
      return;
    }
  };

  const borrarDigito = () => {
    guardarClave((clave) => clave.slice(0, -1));
  };
  return (
    <>
      {pase && <Spinner />}
      <Contenedor className="contenedor">
        <img src="/static/img/iconoBilletera.png" />
        {error && <ErrorMostrar>{error}</ErrorMostrar>}

        <div className="caja1">
          <span
            css={css`
              color: white;
              text-align: center;
            `}
          >
            Ingresa tu clave de Cass
          </span>
          <div className="panelContra" id="panelContra">
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
          </div>
          <div className="botones">
            <div className="botones1 teclas">
              <button
                className="teclas1"
                id="siete"
                value={7}
                onClick={enviarClave}
              >
                7
              </button>
              <button
                className="teclas1"
                id="ocho"
                value={8}
                onClick={enviarClave}
              >
                8
              </button>
              <button
                value={9}
                className="teclas1"
                id="nueve"
                onClick={enviarClave}
              >
                9
              </button>
            </div>
            <div className="botones2 teclas">
              <button
                value={4}
                className="teclas1"
                id="cuatro"
                onClick={enviarClave}
              >
                4
              </button>
              <button
                value={5}
                className="teclas1"
                id="cinco"
                onClick={enviarClave}
              >
                5
              </button>
              <button
                value={6}
                className="teclas1"
                id="seis"
                onClick={enviarClave}
              >
                6
              </button>
            </div>
            <div className="botones3 teclas">
              <button
                value={1}
                className="teclas1"
                id="uno"
                onClick={enviarClave}
              >
                1
              </button>
              <button
                value={2}
                className="teclas1"
                id="dos"
                onClick={enviarClave}
              >
                2
              </button>
              <button
                value={3}
                className="teclas1"
                id="tres"
                onClick={enviarClave}
              >
                3
              </button>
            </div>
            <div className="botones4 teclas">
              <button
                value={0}
                className="teclas1"
                id="cero"
                onClick={enviarClave}
              >
                0
              </button>
              <button
                className="bx bx-message-square-x teclas1"
                id="borrar"
                value={"borrar"}
                onClick={borrarDigito}
              ></button>
              <button
                className="teclas1 bx bxs-send"
                id="enviar"
                onClick={enviarClave}
              ></button>
            </div>
          </div>
        </div>
        {/** 
        <div className="nuevoRegistro">
          <h3>
            ¿No tienes Cuenta? <a href="/registroBilletera">Registrate aqui</a>
          </h3>
        </div>
          
          */}
      </Contenedor>
    </>
  );
};

export default LoginBilletera;

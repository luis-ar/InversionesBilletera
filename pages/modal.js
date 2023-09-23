import styled from "@emotion/styled";
import React from "react";
const Contenedor = styled.div`
  position: absolute;
  background-color: rgb(0 0 0 / 0.92);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .cerrar-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
    width: 1.5rem;
    height: 1.5rem;
    z-index: 2;
    img {
      width: 100%;
    }
  }
  form {
    width: 400px;
    margin: 0 auto;
    padding: 3rem 0;
    legend {
      font-size: 2.4rem;
      text-align: center;
      display: block;
      text-transform: uppercase;
      color: white;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid blue;
    }
    .campo {
      display: grid;
      margin-bottom: 2rem;
    }
    label {
      color: white;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    input[type="text"],
    input[type="number"] {
      background-color: white;
      border-radius: 1rem;
      padding: 0.8rem;
      border: none;
      flex: 1;
      font-size: 1rem;
    }
    input[type="submit"] {
      background-color: #1048a4;
      border: none;
      padding: 0.6rem;
      text-align: center;
      color: white;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 1rem;
      width: 100%;
      transition: background-color 300ms ease;
      :hover {
        background-color: #042a67;
        cursor: pointer;
      }
    }
    select {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 1rem;
      text-align: center;
      background-color: white;
    }
  }
  label {
    color: white;
    text-align: left;
  }
  .formulario.animar {
    position: relative;
    opacity: 1;
    z-index: 1;
  }
  .formulario.cerrar {
    opacity: 0;
  }
`;

const ocultarModal = () => {
  const Modal = document.querySelector(".modal");
  console.log(Modal);
  alert("hola");
};
const modal = () => {
  return (
    <Contenedor className="modal">
      <div className="cerrar-modal">
        <img
          src="/static/img/cerrar.svg"
          alt="cerrar modal"
          onClick={alert("jo")}
        />
      </div>

      <form className="formulario">
        <legend> Nueva Inversión</legend>

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el Nombre del Gasto"
            autocomplete="off"
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            autocomplete="off"
            id="cantidad"
            type="text"
            placeholder="Añade la cantidad del gasto: ej. 300"
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>

          <select id="categoria">
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Básico</option>
            <option value="comida">Medio</option>
            <option value="casa">Avanzado</option>
          </select>
        </div>
        <input type="submit" value="añadir gasto" />
      </form>
    </Contenedor>
  );
};

export default modal;

import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { formatearFecha } from "@/Validacion/convertirUsuarioBilletera";
import Link from "next/link";
import Router from "next/router";
const Contenedor = styled.div`
  padding: 4px 20px;
  padding-bottom: 5px;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  background-color: var(--botonesBilletera);
  border-radius: 5px;
  font-size: 12px;
  .datosPersonales {
    display: flex;
    flex-direction: column;
  }
  :hover {
    background-color: var(--botonesHoverBilletera);
  }
`;
const PanelNumero = ({ usuario, token, tipo }) => {
  const { nombre, phoneNumber, id } = usuario;
  return (
    <div
      style={{ color: "white", cursor: "pointer" }}
      onClick={() => {
        Router.push(`/yapear/${id}?tipo=${tipo}&token=${token}`);
      }}
    >
      <Contenedor>
        <div className="datosPersonales">
          <span className="nombre">{nombre}</span>
          <span className="nombre">{phoneNumber}</span>
        </div>
      </Contenedor>
    </div>
  );
};

export default PanelNumero;

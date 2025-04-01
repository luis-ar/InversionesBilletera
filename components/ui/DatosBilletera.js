import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { formatearFecha } from "@/Validacion/convertirUsuarioBilletera";
import { formatearPresupuesto } from "@/utils/formatearPresupuesto";
const Contenedor = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 13px;
  background-color: var(--botonesBilletera);
  border-radius: 5px;
  .datosPersonales {
    display: flex;
    flex-direction: column;
    font-size: 12px;
  }
`;
const Monto = ({ tipo, monto }) => {
  const estilos = {
    fontWeight: "bold",
    fontSize: "12px",
    color:
      tipo === "retiro"
        ? "rgb(216, 48, 48)"
        : tipo === "deposito"
        ? "var(--botonesContorno)"
        : "inherit",
  };

  return (
    <div className="cantidad">
      <p style={estilos}>{tipo === "retiro" ? `-${monto}` : monto}</p>
    </div>
  );
};
const DatosBilletera = ({ historial }) => {
  const { id, tipo, monto, fecha, receptorId, userSend } = historial;
  const fechaDate = new Date(fecha);

  const fechaFormateada = formatearFecha(fechaDate);
  return (
    <Contenedor>
      <div className="datosPersonales">
        <span className="nombre">
          {tipo === "retiro"
            ? receptorId.phoneNumber.replace(/.(?=.{3})/g, "*")
            : userSend.phoneNumber.replace(/.(?=.{3})/g, "*")}
        </span>
        <span>{fechaFormateada}</span>
      </div>

      <Monto tipo={tipo} monto={formatearPresupuesto(parseInt(monto))} />
    </Contenedor>
  );
};

export default DatosBilletera;

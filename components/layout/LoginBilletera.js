import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Contenedor = styled.div`
  background-color: var(--contCard);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  .caja1 {
    background-color: #747474;
    min-width: 300px;
    height: 420px;
    border-radius: 15px;
    padding: 15px;
    border: solid 5px rgb(21, 20, 22);
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10px;
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
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @media (max-width: 1000px) {
      height: 70px;
    }
  }
  .teclas1 {
    width: 70px;
    height: 50px;
    border-radius: 15px;
    font-size: 30px;
    border: solid 3px rgb(21, 20, 22);
    box-shadow: black 0 0 5px;
    cursor: pointer;
    background-color: rgb(0, 0, 0, 0.2);
    :hover {
      background-color: rgb(0, 0, 0, 0.4);
    }
  }
  .panelContra {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 30px;
    div {
      height: 20px;
      width: 20px;
      border-radius: 50px;
      background-color: white;
    }
  }
  .pintado {
    background-color: black !important;
  }
  img {
    margin-bottom: 10px;
  }
`;
const LoginBilletera = () => {
  const [clave, guardarClave] = useState("");

  // Actualizar círculos al cambiar la clave
  useEffect(() => {
    const circuloContra = document.querySelectorAll(".circuloContra");

    for (let i = 0; i < circuloContra.length; i++) {
      circuloContra[i].classList.toggle("pintado", i < clave.length);
    }
  }, [clave]);

  const enviarClave = (e) => {
    if (clave.length < 6) {
      const nuevo = clave + e.target.value;
      if (nuevo.length < 6) {
        guardarClave(nuevo);
        return;
      }
      if (nuevo.length == 6) {
        guardarClave(nuevo);
        console.log("enviando");
        return;
      }
      return;
    }
    console.log(clave);
  };

  const borrarDigito = () => {
    guardarClave((clave) => clave.slice(0, -1));
  };
  return (
    <>
      <Contenedor className="contenedor">
        <h3
          css={css`
            color: white;
          `}
        >
          Ingresa tu clave de Yape
        </h3>
        <img width="100" src="/static/img/yape.png" />
        <div className="caja1">
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
      </Contenedor>
    </>
  );
};

export default LoginBilletera;

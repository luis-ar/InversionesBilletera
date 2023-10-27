import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FirebaseContext } from "@/firebase";
import SliderBilletera from "./SliderBilletera";
import DatosBilletera from "./DatosBilletera";
const Contenedor = styled.div`
  background-color: var(--fondoBilletera);
  height: 500px;
  width: 300px;
  border-radius: 15px;
  .encabezado {
    padding: 10px;
    background-color: var(--botonesBilletera);
    height: 40px;
    width: 100%;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
    i {
      font-size: 30px;
    }
    p {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .saldo {
    margin-top: 15px;
    width: 100%;
    height: 35px;
    padding: 0 20px;
    background-color: transparent;
    div {
      background-color: var(--botonesBilletera);
      height: 100%;
      border-radius: 5px;
      cursor: pointer;
    }
    .mostrarSaldo {
      padding-left: 10px;
      padding-right: 10px;
      div {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      p,
      span {
        font-weight: bold;
        font-size: 14px;
      }
      img {
        width: 20px;
        height: 20px;
      }
      i {
        font-size: 20px;
      }
      .visualizarSaldo {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;
const InicioBilletera = ({ token }) => {
  const { firebase, usuario } = useContext(FirebaseContext);
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [historiales, setHistoriales] = useState();
  const retornoSaldo = () => {
    if (mostrarSaldo) {
      setMostrarSaldo(false);
    } else {
      setMostrarSaldo(true);
    }
  };
  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
    });
  };

  fetch("https://billapp-5d53d479ff62.herokuapp.com/api/wallet", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setHistoriales(data["data"]["WalletHistrial"]);
      setSaldo(data["data"]["cash"]);
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <div
      css={css`
        width: 100%;
        height: calc(90vh - 55px);
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 1000px) {
          height: calc(90vh - 103px);
        }
      `}
    >
      <Contenedor>
        <div className="encabezado">
          <div>
            <i class="bx bx-menu"></i>
          </div>
          <div>
            {usuario && (
              <p>
                Hola, <span>{usuario.displayName}</span>
              </p>
            )}
          </div>
        </div>
        <SliderBilletera />
        <div className="saldo">
          <div className="mostrarSaldo" onClick={retornoSaldo}>
            {mostrarSaldo ? (
              <>
                <div className="visualizarSaldo">
                  <div>
                    <i class="bx bxs-low-vision"></i> <p>Ocultar Saldo</p>
                  </div>
                  <div>
                    <span>{formatearPresupuesto(parseInt(saldo))}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="ocultarSaldo">
                  <img src="/static/img/ojo.png" />
                  <p>Mostrar Saldo</p>
                </div>
              </>
            )}
          </div>
        </div>
        <p
          css={css`
            padding: 10px 20px;
            font-weight: bold;
            font-size: 12px;
          `}
        >
          Movimientos
        </p>

        <div>
          <ul>
            {historiales ? (
              <>
                {historiales.map((historial) => (
                  <DatosBilletera historial={historial} />
                ))}
              </>
            ) : (
              <p
                css={css`
                  font-weight: bold;
                  font-size: 12px;
                  padding: 0 20px;
                `}
              >
                "Aún no tiene historial"
              </p>
            )}
          </ul>
        </div>
      </Contenedor>
    </div>
  );
};

export default InicioBilletera;

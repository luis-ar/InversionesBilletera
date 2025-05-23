import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FirebaseContext } from "@/firebase";
import SliderBilletera from "./SliderBilletera";
import DatosBilletera from "./DatosBilletera";
import Link from "next/link";
import SpinnerHistorial from "./SpinnerHistorial";
import { perfilUsuario } from "@/utils/perfilUser";
const MostrarError = styled.div`
  width: 300px;
  height: 505px;
  position: fixed;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  span {
    color: red;
    margin-bottom: 10px;
    font-weight: bold;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  a {
    background-color: black;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
  }
`;
const Contenedor = styled.div`
  background-color: var(--fondoBilletera);
  height: 500px;
  width: 300px;
  border-radius: 15px;
  overflow: hidden;
  @media (max-width: 500px) {
    scale: 0.8;
  }
  .encabezado {
    padding: 10px;
    background-color: var(--botonesContorno);
    height: 40px;
    width: 100%;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
    a {
      color: white;
    }
    i {
      font-size: 30px;
      font-weight: bold;
    }
    p {
      font-weight: bold;
      font-size: 20px;
    }
    div {
      display: flex;
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
const HistorialCompleto = ({ token }) => {
  const { firebase, usuario } = useContext(FirebaseContext);
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [historiales, setHistoriales] = useState();
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState();
  const retornoSaldo = () => {
    if (mostrarSaldo) {
      setMostrarSaldo(false);
    } else {
      setMostrarSaldo(true);
    }
  };
  // const formatearPresupuesto = (cantidad) => {
  //   return cantidad.toLocaleString("es-PE", {
  //     style: "currency",
  //     currency: "PEN",
  //   });
  // };
  useEffect(() => {
    const datosUser = async () => {
      const data = await perfilUsuario(token);
      setHistoriales(data.transacciones);
      setLoading(false);
    };

    datosUser();
  }, [token]);

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
        {error && (
          <MostrarError>
            <div>
              <span>{error}</span>
              <Link href="/billetera">Iniciar Sesión</Link>
            </div>
          </MostrarError>
        )}
        <div
          css={css`
            height: 10%;
          `}
        >
          <div className="encabezado">
            <div>
              <div>
                <Link href={`/usuarios/${token}`}>
                  <i class="bx bx-x"></i>
                </Link>
              </div>
              <div>{usuario && <p>Movimientos</p>}</div>
            </div>
          </div>
        </div>

        <div
          css={css`
            height: 90%;
          `}
        >
          {loading && <SpinnerHistorial />}

          <ul
            css={css`
              height: 100%;
              margin-top: 5px;
              overflow-y: auto;
            `}
          >
            {historiales ? (
              <>
                {historiales.map((historial, index) => (
                  <DatosBilletera key={index} historial={historial} />
                ))}
              </>
            ) : (
              !loading && (
                <p
                  css={css`
                    font-weight: bold;
                    font-size: 12px;
                    padding: 0 20px;
                  `}
                >
                  "Aún no tiene historial"
                </p>
              )
            )}
          </ul>
        </div>
      </Contenedor>
    </div>
  );
};

export default HistorialCompleto;

import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FirebaseContext } from "@/firebase";
import SliderBilletera from "./SliderBilletera";
import DatosBilletera from "./DatosBilletera";
import Link from "next/link";
import SpinnerHistorial from "./SpinnerHistorial";
import recuperarDatosUsuario from "@/Validacion/recuperarDatosUsuario";
import { perfilUsuario } from "@/utils/perfilUser";
import { formatearPresupuesto } from "@/utils/formatearPresupuesto";

const Pie = styled.div`
  background-color: var(--botonesContorno);
  height: 10%;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10px;
  font-size: 13px;
  gap: 10px;
  a {
    div {
      width: 100%;
      justify-content: center;
      display: flex;
      align-items: center;
      padding: 7px 6px;
    }
    color: white;
  }
  div {
    background-color: var(--fondoBilletera);
    padding: 7px 6px;
    text-align: center;
    border-radius: 5px;
    i {
      margin-right: 5px;
    }
  }
`;

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
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true); // Estado de carga
  const [estado, setEstado] = useState();
  const [data, setData] = useState();
  const retornoSaldo = () => {
    if (mostrarSaldo) {
      setMostrarSaldo(false);
    } else {
      setMostrarSaldo(true);
    }
  };

  useEffect(() => {
    const datosUser = async () => {
      const data = await perfilUsuario(token);
      setSaldo(data.saldo);
      setHistoriales(data.transacciones);
      setData(data);
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
          margin-bottom: 60px;
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
            height: 40%;
          `}
        >
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
          <div
            css={css`
              a {
                color: white;
                font-weight: bold;
                padding: 10px 20px;
              }
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 14px;
            `}
          >
            <p
              css={css`
                padding: 10px 20px;
                font-weight: bold;
              `}
            >
              Últimos Movimientos
            </p>
            <Link href={`/historial/${token}`}>Ver Todos</Link>
          </div>
        </div>
        <div
          css={css`
            height: 50%;
          `}
        >
          {loading && <SpinnerHistorial />}

          <ul
            css={css`
              height: 100%;
              overflow: hidden;
              margin-top: 5px;
            `}
          >
            {historiales ? (
              <>
                {historiales.slice(0, 4).map((historial, index) => (
                  <DatosBilletera key={index} historial={historial} />
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
        <Pie>
          <Link
            href={`/transferencia/${token}`}
            style={{ textDecoration: "none", flex: 1, display: "flex" }}
          >
            <div>
              <i className="bx bx-paper-plane"></i>
              Yapear
            </div>
          </Link>
          {data?.type === "admin" && (
            <Link
              href={`/recargar/${token}`}
              style={{ textDecoration: "none", width: "50%" }}
            >
              <div>
                <i className="bx bx-reset bx-rotate-180"></i> Recargar
              </div>
            </Link>
          )}
        </Pie>
      </Contenedor>
    </div>
  );
};

export default InicioBilletera;

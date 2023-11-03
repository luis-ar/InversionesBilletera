import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FirebaseContext } from "@/firebase";
import SliderBilletera from "./SliderBilletera";
import DatosBilletera from "./DatosBilletera";
import Link from "next/link";
import SpinnerHistorial from "./SpinnerHistorial";
import recuperarDatos from "@/Validacion/recuperarDatos";
import transferirDineroYape from "@/Validacion/transferirDineroYape";
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
  .datosGenerales {
    text-align: center;
    font-weight: bold;
    span,
    p {
      font-size: 25px;
    }
  }
  form {
    padding: 20px;
    button {
      background-color: var(--botonesBilletera);
      width: 100%;
      height: 50px;
      border: none;
      border-radius: 10px;
      margin-top: 20px;
      color: white;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .contenedorValor {
    input {
      height: 100%;
      width: 100%;
      background-color: transparent;
      border: none;
      color: white;
      font-size: 60px;
      text-align: center;
      :focus {
        outline: none;
      }
      ::placeholder {
        color: white;
      }
    }
  }
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
const PanelYapear = ({ token, id }) => {
  const { firebase, usuario } = useContext(FirebaseContext);
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [datosUser, setDatos] = useState();
  const [saldo, setSaldo] = useState(0);
  const [historiales, setHistoriales] = useState();
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState();
  const [valor, setValor] = useState();
  const [respuesta, setRespuesta] = useState();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://billapp-5d53d479ff62.herokuapp.com/api/wallet",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error de servidor");
        }

        setHistoriales(data["data"]["WalletHistrial"]);
        setSaldo(data["data"]["cash"]);
        setLoading(false); // Marca como cargado
      } catch (error) {
        // console.error("Error al obtener datos:", error.message);
        if (error.message.length === 29) {
          setError(error.message);
          setLoading(false);
        }
        if (
          (error.message =
            "Cannot read properties of null (reading 'WalletHistrial')")
        ) {
          setLoading(false);
        }
      }
    };

    fetchData(); // Llama a la función asincrónica
  }, [token]);

  useEffect(() => {
    const llamadaDatos = async () => {
      const datos = await recuperarDatos(id, token);
      setDatos(datos["data"]);
      setLoading(false); // Marca como cargado
    };
    llamadaDatos();
  }, []);

  const formatoMoneda = (e) => {
    const valorNumerico = e.target.value.replace(/[^0-9]/g, "");
    setValor(valorNumerico === "" ? "" : `S/ ${valorNumerico}`);
  };
  const transferirDinero = async (e) => {
    e.preventDefault();
    const numeroExtraido = valor.replace(/\D/g, "");
    const numero = parseInt(numeroExtraido, 10);
    const datos = await transferirDineroYape(id, numero, token);
    setRespuesta(datos["message"]);
  };
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
        {respuesta && (
          <MostrarError>
            <div>
              <span
                css={css`
                  text-align: center;
                  color: #10da1a !important;
                `}
              >
                {respuesta}
              </span>
              <Link href={`/usuarios/${token}`}>
                Regresar a la Pagina Principal
              </Link>
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
              <div>{usuario && <p>Yapear a</p>}</div>
            </div>
          </div>
        </div>

        <div
          css={css`
            height: 90%;
          `}
        >
          {loading && <SpinnerHistorial />}
          {datosUser && (
            <div className="datosGenerales">
              <span>
                {datosUser["names"]} {datosUser["lastname"]}
              </span>
              <p>{datosUser["phone"]}</p>
            </div>
          )}
          <form onSubmit={transferirDinero}>
            <div className="contenedorValor">
              <input
                type="text"
                id="monto"
                value={valor}
                onChange={formatoMoneda}
                placeholder="S/ 0"
              />{" "}
            </div>

            <div className="contenedorBoton">
              <button>Yapear</button>
            </div>
          </form>

          {/* <ul
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
          </ul> */}
        </div>
      </Contenedor>
    </div>
  );
};

export default PanelYapear;

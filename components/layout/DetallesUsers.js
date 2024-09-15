import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from "next/link";
import obtenerPhone from "@/Validacion/obtenerPhone";
import { FirebaseContext } from "@/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import MapPage from "../ui/MapaPrueba";
import { css } from "@emotion/react";
import obtenerDatosExtras from "@/Validacion/obtenerDatosExtras";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const Producto = styled.li`
  padding: 1.2rem;
  border-radius: 20px;
  border: 0.2px solid #4b4b4b;
  margin-bottom: 7px;
  background-color: var(--contBoton);
  display: flex;
  flex-direction: column;
  align-items: center;
  :hover {
    background-color: #000000;
    cursor: pointer;
  }
`;
const DescripcionProducto = styled.div`
  display: flex;
  flex: 1;
  color: #e1e1e1;
  column-gap: 2rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr); /* Dos columnas de igual ancho */
  }
`;
const Titulo = styled.a`
  font-size: 1.8rem;
  font-weight: bold;
  color: #e1e1e1;
  margin: 0;
  :hover {
    cursor: pointer;
    color: blue;
  }
  @media (max-width: 550px) {
    font-size: 1.5rem;
  }
`;
const Precio = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
  @media (max-width: 550px) {
    font-size: 15px;
    span {
      font-size: 12px;
    }
  }
`;

const TextoDescripcion = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
  @media (max-width: 550px) {
    font-size: 1.2rem;
  }
`;
const Comentarios = styled.div`
  font-size: 20px;
  margin-top: rem;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  div {
    display: flex;
    align-items: center;
    border: 0.2px solid #4e4f50;
    padding: 0.3rem 1rem;
    height: 30px;
    border-radius: 5px;
    background-color: var(--grisBotones);
  }

  img {
    width: 2rem;
    margin-right: 2rem;
    @media (max-width: 550px) {
      width: 1.5rem;
    }
  }

  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
    @media (max-width: 550px) {
      font-size: 1.2rem;
    }
  }

  .corazon {
    cursor: pointer;
  }
  .bx {
    margin-right: 5px;
    cursor: pointer;
  }
  .bx-map {
    color: #dc2626;
    cursor: pointer;
  }
  .bxl-whatsapp {
    color: #3ff71a;
  }
`;

// npm i date-fns
const Imagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 50%;
`;

const Votos = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;
  div {
    font-size: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
  @media (max-width: 550px) {
    padding: 5px;
    div {
      font-size: 1.3rem;
    }
    p {
      margin: 0;
      font-size: 1.3rem;
      font-weight: 700;
    }
  }
`;
const ContenedorImagen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 150px;
  height: 150px;
`;

const Publicado = styled.p`
  @media (max-width: 550px) {
    font-size: 12px;
  }
`;
const ContenedorDatos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
const RedesSociales = styled.div`
  display: flex;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    height: 30px;
    border-radius: 5px;
    font-size: 30px;
    height: 40px;
    :first-child {
      margin-right: 1rem;
    }
  }
  .bx-map {
    color: #dc2626;
  }
  .bxl-whatsapp {
    color: #3ff71a;
  }
`;
const Contenedor = styled.div`
  position: fixed;
  z-index: 200;
  background-color: rgb(0 0 0 / 0.92);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .cerrar-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
    width: 2rem;
    height: 2rem;
    z-index: 2;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
`;
const Mapa = styled.div`
  z-index: 1;
  width: 80%;
  height: 60%;
  border: 1px solid #e1e1e1;
  margin-bottom: 20px;
`;
const DetallesUsers = ({ user }) => {
  const {
    id,
    nombre,
    email,
    phone,
    departamento,
    distrito,
    photoURL,
    votantes,
    like,
  } = user;
  const { firebase, usuario } = useContext(FirebaseContext);
  const [votantesNuevos, setVotantes] = useState(votantes);
  const [votos, setVotos] = useState(like);
  useEffect(() => {
    const obtenerDatos = async () => {
      if (user) {
        const { like, votantes } = await obtenerDatosExtras(id);
        setVotos(like);
        setVotantes(votantes);
      }
    };
    obtenerDatos();
  }, [user]);
  const votarUsuario = async () => {
    if (!usuario) {
      return;
    }
    //obtener y sumar un nuevo voto
    const nuevoTotal = votos + 1;
    //verificar si el usuario actual ha votado
    if (votantesNuevos.includes(usuario.uid)) {
      return;
    }
    //guardar el ID del usuario que ha votado
    const nuevoVotantes = [...votantesNuevos, usuario.uid];

    //actualizar en la bd
    const docRef = doc(firebase.db, "usuarios", `${id}`);
    updateDoc(docRef, {
      like: nuevoTotal,
      votantes: nuevoVotantes,
    });
    const { like, votantes } = await obtenerDatosExtras(id);
    setVotos(like);
    setVotantes(votantes);
  };

  return (
    <>
      <Producto>
        <ContenedorImagen>
          <Imagen
            src={
              photoURL != null && photoURL
                ? photoURL
                : "/static/img/imagenPerfil.png"
            }
          />
        </ContenedorImagen>
        <DescripcionProducto>
          <ContenedorDatos>
            {usuario?.uid == id && (
              <p
                css={css`
                  font-weight: bold;
                  text-align: center;
                  text-transform: uppercase;
                  background-color: #da552f;
                  color: white;
                  padding: 5px;
                  border-radius: 5px;
                  margin: 10px 0;
                `}
              >
                Tu perfil
              </p>
            )}

            <div
              css={css`
                font-weight: bold;
              `}
            >
              <p>{nombre}</p>
              <p>{email}</p>
            </div>
            <TextoDescripcion>
              {distrito}, {departamento}, Perú
            </TextoDescripcion>
            <Comentarios>
              <div className="corazon" onClick={votarUsuario}>
                {votantesNuevos.includes(usuario?.uid) ? (
                  <FaHeart className="bx" />
                ) : (
                  <FaRegHeart className="bx" />
                )}
                <p>{votos}</p>
              </div>

              <a href={`https://wa.me/${phone}`} target="_blank">
                <div className="whatsapp">
                  <i class="bx bxl-whatsapp"></i>
                </div>
              </a>
            </Comentarios>
          </ContenedorDatos>
        </DescripcionProducto>
      </Producto>
    </>
  );
};

export default DetallesUsers;

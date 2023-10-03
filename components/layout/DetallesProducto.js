import React from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from "next/link";
const Producto = styled.li`
  padding: 1.5rem;
  border-radius: 20px;
  border: 0.8px solid #d4d3d2;
  margin-bottom: 7px;
  background-color: #0e1010;
  display: flex;
  flex-direction: column;
  align-items: center;
  :last-child {
    margin-bottom: 15px;
  }
`;
const DescripcionProducto = styled.div`
  flex: 0 1;
  color: white;
  column-gap: 2rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr); /* Dos columnas de igual ancho */
  }
`;
const Titulo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: white;
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
  font-size: 22px;
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
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
    height: 30px;
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
  border-radius: 15px;
  box-shadow: 0 0 5px 1px white;
  @media (max-width: 550px) {
    width: 150px;
  }
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
  width: 200px;
  height: 200px;
`;

const Publicado = styled.p`
  margin-bottom: 5px;
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
const DetallesProducto = ({ producto }) => {
  const {
    id,
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    votos,
    precio,
  } = producto;

  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  return (
    <>
      <Producto>
        <ContenedorImagen>
          <Imagen src={urlimagen} />
        </ContenedorImagen>
        <DescripcionProducto>
          <ContenedorDatos>
            <Link href="/productos/[id]" as={`/productos/${id}`}>
              <Titulo>{nombre}</Titulo>
            </Link>
            {/* <TextoDescripcion>{descripcion}</TextoDescripcion> */}
            <Precio>{formatearPresupuesto(parseInt(precio))}</Precio>
            <Comentarios>
              <div>
                <i class="bx bx-message-rounded-dots"></i>{" "}
                <p>{comentarios.length}</p>
              </div>
              <div className="corazon">
                <i className="bx bx-heart"></i>
                <p>{votos}</p>
              </div>
              <div className="ubicacion">
                <i class="bx bx-map"></i>
              </div>
              <div className="whatsapp">
                <i class="bx bxl-whatsapp"></i>
              </div>
            </Comentarios>
            <Publicado>
              Publicado hace{" "}
              {formatDistanceToNow(new Date(creado), { locale: es })}
            </Publicado>
          </ContenedorDatos>
        </DescripcionProducto>

        {/* <Votos>
          <div>&#9650;</div>
          <p>{votos}</p>
        </Votos> */}
      </Producto>
      {/* <style jsx>
        {`
          .prueba {
            color: red;
            
          }
        `}
      </style> */}
    </>
  );
};

export default DetallesProducto;

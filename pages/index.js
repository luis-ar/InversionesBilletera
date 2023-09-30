import Layout from "../components/layout/Layout";
import React, { useEffect, useState, useContext } from "react";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../Hooks/useProductos";
import Slider from "@/components/ui/Slider";
import BarraLateral from "@/components/ui/BarraLateral";
// npm i @emotion/core @emotio/styled babel-plugin-emotion @emotion/babel-preset-css-prop
// npm install @emotion/core @emotion/styled babel-plugin-emotion @emotion/babel-preset-css-prop @babel-core @emotion/react –save
import { css } from "@emotion/react";

export default function Home() {
  const { productos } = useProductos("creado");

  const datosFiltrados = productos.filter(
    (item) => item.categoria !== "habilitacionUrbana"
  );

  return (
    <>
      <Layout>
        <Slider />
        <div
          className="listado-productos"
          css={css`
            margin-left: 30%;
            @media (min-width: 1000px) {
              margin-left: 300px;
            }
          `}
        >
          <div className="contenedor">
            <ul>
              {datosFiltrados.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}

import Layout from "../components/layout/Layout";
import React, { useEffect, useState, useContext } from "react";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../Hooks/useProductos";
import Slider from "@/components/ui/Slider";
// npm i @emotion/core @emotio/styled babel-plugin-emotion @emotion/babel-preset-css-prop
// npm install @emotion/core @emotion/styled babel-plugin-emotion @emotion/babel-preset-css-prop @babel-core @emotion/react –save

export default function Home() {
  const { productos } = useProductos("creado");

  const datosFiltrados = productos.filter(
    (item) => item.categoria !== "habilitacionUrbana"
  );

  return (
    <div>
      <Layout>
        <Slider />
        <div className="listado-productos">
          <div className="contenedor">
            <ul >
              {datosFiltrados.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}

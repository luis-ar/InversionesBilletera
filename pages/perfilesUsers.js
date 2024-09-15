import Layout from "../components/layout/Layout";
import React, { useEffect, useState, useContext } from "react";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../Hooks/useProductos";
import { css } from "@emotion/react";
import useUsers from "@/Hooks/useUsers";
import DetallesUsers from "@/components/layout/DetallesUsers";
// npm i @emotion/core @emotio/styled babel-plugin-emotion @emotion/babel-preset-css-prop
// npm install @emotion/core @emotion/styled babel-plugin-emotion @emotion/babel-preset-css-prop @babel-core @emotion/react –save

export default function perfilesUsers() {
  const { usuarios } = useUsers();
  return (
    <div>
      <Layout>
        <div
          className="listado-productos"
          css={css`
            @media (min-width: 1000px) {
              margin-left: 300px;
            }
          `}
        >
          <div className="contenedor">
            <ul
              css={css`
                width: 100%;
                display: grid;
                gap: 2rem;
                grid-auto-rows: auto;
                grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
              `}
            >
              {usuarios.map((user) => (
                <DetallesUsers key={user.id} user={user} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}

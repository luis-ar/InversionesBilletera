import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React from "react";
import Layout from "@/components/layout/Layout";
const principalBilletera = () => {
  return (
    <Layout>
      <div
        css={css`
          color: white;
          @media (min-width: 1000px) {
            margin-left: 300px;
          }
        `}
      >
        <h1>Hola mundo, Pagina principal de yape</h1>
      </div>
    </Layout>
  );
};

export default principalBilletera;

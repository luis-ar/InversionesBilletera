import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../Hooks/useProductos";
import BarraRedes from "@/components/ui/BarraRedes";
const filtro = () => {
  //leer lo q me manda del querry en el link

  const router = useRouter();
  const {
    query: { q },
  } = router;
  //todos los productos
  const { productos } = useProductos("creado");
  const [resultado, guardarResultado] = useState([]);
  useEffect(() => {
    const busqueda = q !== undefined && q.toLowerCase();
    const filtro = productos.filter((producto) => {
      return producto.categoria.toLowerCase().includes(busqueda);
    });
    guardarResultado(filtro);
  }, [q, productos]);
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
        <BarraRedes />
      </Layout>
    </div>
  );
};

export default filtro;

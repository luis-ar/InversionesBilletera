export const formatearPresupuesto = (cantidad) => {
  return cantidad.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
};

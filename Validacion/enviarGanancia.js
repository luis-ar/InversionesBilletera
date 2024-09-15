import sumarSaldo from "./actualizarSaldo";
import sumarDatosExtras from "./sumarDatosExtras";

const enviarGanancia = (inversores, monto, precio) => {
  inversores.map(async (inversor) => {
    const ganancia = (monto * inversor["cubos"]) / 100;
    const inversion = (precio * inversor["cubos"]) / 100;
    const diferencia = ganancia - inversion;
    const id = inversor["usuarioId"];
    await sumarSaldo(id, ganancia);
    await sumarDatosExtras(id, diferencia);
  });
};
export default enviarGanancia;

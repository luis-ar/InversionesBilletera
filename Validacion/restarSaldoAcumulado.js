import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

async function restarSaldoAcumulado(uid, idProducto, cantidadAdicional) {
  try {
    const db = getFirestore();
    const usuarioDocRef = doc(db, "usuarios", uid);

    // Obtener el saldo actual del usuario
    const usuarioSnapshot = await getDoc(usuarioDocRef);

    if (usuarioSnapshot.exists()) {
      let saldosRecaudados = usuarioSnapshot.data().saldoRecaudado;

      // Buscar el índice del saldo correspondiente al producto
      const index = saldosRecaudados.findIndex(
        (saldo) => saldo.idProducto === idProducto
      );

      if (index !== -1) {
        // Si encuentra el producto, ajustar el monto
        const saldoActual = saldosRecaudados[index].monto;
        const nuevoSaldo =
          parseFloat(saldoActual) - parseFloat(cantidadAdicional);

        if (nuevoSaldo >= 0) {
          console.log("restando el saldo");
          saldosRecaudados[index].monto = nuevoSaldo;

          await updateDoc(usuarioDocRef, {
            saldoRecaudado: saldosRecaudados,
          });
        } else {
          const mensaje = "saldo insuficiente";
          return mensaje;
        }
      } else {
        // Si no encuentra el producto, se podría manejar como un error o agregarlo
        console.error("Producto no encontrado en el saldo recaudado.");
      }
    } else {
      console.error(
        'El usuario no tiene un documento en la colección "usuarios".'
      );
    }
  } catch (error) {
    console.error("Error al restar el saldo:", error);
  }
}

export default restarSaldoAcumulado;

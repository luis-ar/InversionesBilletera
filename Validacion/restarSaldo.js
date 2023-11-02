import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

async function restarSaldo(uid, cantidadAdicional) {
  try {
    const db = getFirestore();
    const usuarioDocRef = doc(db, "usuarios", uid);

    // Obtener el saldo actual del usuario
    const usuarioSnapshot = await getDoc(usuarioDocRef);

    if (usuarioSnapshot.exists()) {
      const saldoActual = usuarioSnapshot.data().saldo;

      // Sumar la cantidad adicional al saldo actual
      const nuevoSaldo =
        parseFloat(saldoActual) - parseFloat(cantidadAdicional);

      // Actualizar el campo "saldo" en el documento del usuario
      if (nuevoSaldo >= 0) {
        await updateDoc(usuarioDocRef, {
          saldo: nuevoSaldo,
        });

        console.log(
          "Saldo actualizado correctamente. Nuevo saldo:",
          nuevoSaldo
        );
      } else {
        const mensaje = "saldo insuficiente";
        return mensaje;
      }
    } else {
      console.error(
        'El usuario no tiene un documento en la colección "usuarios".'
      );
    }
  } catch (error) {
    console.error("Error al al restar el saldo:", error);
  }
}

export default restarSaldo;

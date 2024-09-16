import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

async function restarSaldoGanancia(uid, uidCreador, cantidadAdicional) {
  try {
    const db = getFirestore();
    const usuarioDocRef = doc(db, "usuarios", uid);
    const creadorDocRef = doc(db, "usuarios", uidCreador);

    // Obtener el saldo actual del usuario
    const usuarioSnapshot = await getDoc(usuarioDocRef);
    const creadorSnapshot = await getDoc(creadorDocRef);

    if (usuarioSnapshot.exists() && creadorSnapshot.exists()) {
      const saldoActual = usuarioSnapshot.data().saldo;
      // Sumar la cantidad adicional al saldo actual

      const nuevoSaldo =
        parseFloat(saldoActual) - parseFloat(cantidadAdicional);

      await updateDoc(usuarioDocRef, {
        saldo: nuevoSaldo,
      });
    } else {
      console.error(
        'El usuario no tiene un documento en la colección "usuarios".'
      );
    }
  } catch (error) {
    console.error("Error al al restar el saldo:", error);
  }
}

export default restarSaldoGanancia;

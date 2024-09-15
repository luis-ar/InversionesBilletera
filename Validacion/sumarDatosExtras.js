import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

async function sumarDatosExtras(uid, cantidadAdicional) {
  try {
    const db = getFirestore();
    const usuarioDocRef = doc(db, "usuarios", uid);

    // Obtener el saldo actual del usuario
    const usuarioSnapshot = await getDoc(usuarioDocRef);

    if (usuarioSnapshot.exists()) {
      const gananciaActual = usuarioSnapshot.data().ganancia;
      const inversionesCompletadasActual =
        usuarioSnapshot.data().inversionesCompletadas;

      // Sumar la cantidad adicional al saldo actual

      const nuevoInversionesCompletadas = inversionesCompletadasActual + 1;
      const nuevaGanancia =
        parseFloat(gananciaActual) + parseFloat(cantidadAdicional);

      // Actualizar el campo "saldo" en el documento del usuario
      await updateDoc(usuarioDocRef, {
        ganancia: nuevaGanancia,
        inversionesCompletadas: nuevoInversionesCompletadas,
      });

      console.log("Saldo actualizado correctamente. Nuevo saldo ganancia:");
    } else {
      console.error(
        'El usuario no tiene un documento en la colección "usuarios".'
      );
    }
  } catch (error) {
    console.error("Error al sumar al saldo:", error);
  }
}

export default sumarDatosExtras;

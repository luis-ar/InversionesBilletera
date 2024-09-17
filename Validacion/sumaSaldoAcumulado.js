import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

async function sumarSaldoAcumulado(uid, idProducto, cantidadAdicional) {
  try {
    const db = getFirestore();
    const usuarioDocRef = doc(db, "usuarios", uid);

    // Obtener el saldo actual del usuario
    const usuarioSnapshot = await getDoc(usuarioDocRef);

    if (usuarioSnapshot.exists()) {
      let saldoActual = usuarioSnapshot.data().saldoRecaudado || [];

      // Buscar si el idProducto ya existe en el array
      const indiceProducto = saldoActual.findIndex(
        (saldo) => saldo.idProducto === idProducto
      );

      if (indiceProducto !== -1) {
        // Si el idProducto existe, actualizar el monto existente
        saldoActual[indiceProducto].monto =
          parseFloat(saldoActual[indiceProducto].monto) +
          parseFloat(cantidadAdicional);
      } else {
        // Si el idProducto no existe, agregarlo al array
        saldoActual.push({
          idProducto: idProducto,
          monto: parseFloat(cantidadAdicional),
        });
      }

      // Actualizar el campo "saldoRecaudado" en el documento del usuario
      await updateDoc(usuarioDocRef, {
        saldoRecaudado: saldoActual,
      });

      console.log("Saldo actualizado correctamente. Nuevo saldo:", saldoActual);
    } else {
      console.error(
        'El usuario no tiene un documento en la colección "usuarios".'
      );
    }
  } catch (error) {
    console.error("Error al sumar al saldo:", error);
  }
}

export default sumarSaldoAcumulado;

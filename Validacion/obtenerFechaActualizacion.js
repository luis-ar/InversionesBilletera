import { getFirestore, doc, getDoc } from "firebase/firestore";
async function obtenerFechaActualizacion(uid) {
  const db = getFirestore();
  const usuarioDocRef = doc(db, "usuarios", uid);

  try {
    const snapshot = await getDoc(usuarioDocRef);

    if (snapshot.exists()) {
      const fechaActualizacion = snapshot.data().fechaActualizacion;
      return fechaActualizacion;
    } else {
      console.error(
        'El usuario no tiene un documento en la colección "usuarios"'
      );
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el saldo:", error);
    return null;
  }
}

export default obtenerFechaActualizacion;

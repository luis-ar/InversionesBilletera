import { getFirestore, doc, getDoc } from "firebase/firestore";
async function obtenerDatosExtras(uid) {
  const db = getFirestore();
  const usuarioDocRef = doc(db, "usuarios", uid);
  try {
    const snapshot = await getDoc(usuarioDocRef);

    if (snapshot.exists()) {
      const departamento = snapshot.data().departamento;
      const provincia = snapshot.data().provincia;
      const distrito = snapshot.data().distrito;
      const like = snapshot.data().like;
      const ganancia = snapshot.data().ganancia;
      const inversionesCompletadas = snapshot.data().inversionesCompletadas;
      const phone = snapshot.data().phone;
      const votantes = snapshot.data().votantes;
      const respuesta = {
        departamento,
        provincia,
        distrito,
        like,
        ganancia,
        inversionesCompletadas,
        phone,
        votantes,
      };

      return respuesta;
    } else {
      console.error(
        'El usuario no tiene un documento en la colección "usuarios"'
      );
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el numero:", error);
    return null;
  }
}

export default obtenerDatosExtras;

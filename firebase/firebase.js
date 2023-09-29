import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebaseConfig from "./config";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "@firebase/storage";

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }
  //registra usuario
  async registrar(nombre, email, password, imagen) {
    const nuevoUsuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    // Subir la imagen de perfil al almacenamiento de Firebase
    const storageRef = ref(
      this.storage,
      `profile_images/${nuevoUsuario.user.uid}`
    );
    await uploadBytesResumable(storageRef, imagen);

    // Obtener la URL de descarga de la imagen de perfil
    let imagenPerfilURL;
    if (imagen) {
      imagenPerfilURL = await getDownloadURL(storageRef);
    } else {
      imagenPerfilURL = "";
    }
    return await updateProfile(nuevoUsuario.user, {
      displayName: nombre,
      photoURL: imagenPerfilURL,
    });
  }
  //Inicia Sesion del usuario
  async login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //cierra la sesion del usuario
  async cerrarSesion() {
    await signOut(this.auth);
  }
}

const firebase = new Firebase();
export default firebase;

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
import { getStorage } from '@firebase/storage';

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }
  //registra usuario
  async registrar(nombre, email, password) {
    const nuevoUsuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return await updateProfile(nuevoUsuario.user, {
      displayName: nombre,
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

import { FirebaseContext } from "../firebase";
import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function useUsers() {
  const [usuarios, guardarUsuarios] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      let articlesSnapshot = await getDocs(
        query(collection(firebase.db, "usuarios"))
      );
      const usuarios = articlesSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      guardarUsuarios(usuarios);
    };
    obtenerUsuarios();
  }, []);
  return {
    usuarios,
  };
}

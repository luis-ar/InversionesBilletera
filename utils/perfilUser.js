export const perfilUsuario = async (token) => {
  const url = `${process.env.NEXT_PUBLIC_PATH_BILLETERA}/perfil`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error al obtener perfil:", error.message);
    console.error(error.message);
    throw error;
  }
};

export const allPerfilUsuario = async (token) => {
  const url = `${process.env.NEXT_PUBLIC_PATH_BILLETERA}/dataUsuarios`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error al obtener perfil:", error.message);
    console.error(error.message);
    throw error;
  }
};

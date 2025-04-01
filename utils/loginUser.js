export const iniciarSesion = async (email, password) => {
  const url = `${process.env.NEXT_PUBLIC_PATH_BILLETERA}/iniciar-sesion`;

  const data = {
    email: email?.trim(),
    password: password?.trim(),
  };

  // Validación básica
  if (!data.email || !data.password) {
    throw new Error("Email y contraseña son obligatorios");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error en iniciarSesion:", error.message);
    console.error(error.message);
    throw error;
  }
};

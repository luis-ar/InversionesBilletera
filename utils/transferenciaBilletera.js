export const transferenciaBilletera = async (monto, tipo, id, token) => {
  const url = `${process.env.NEXT_PUBLIC_PATH_BILLETERA}/${tipo}`;
  const data = {
    monto: monto,
    receptorId: id,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error en transferenciaBilletera:", error.message);
    console.error(error.message);
    throw error;
  }
};

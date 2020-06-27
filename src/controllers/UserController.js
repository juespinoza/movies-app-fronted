export const registration = async (data) => {
  //const endpoint = "http://192.168.1.2:47000/user/registration";
  const endpoint = "http://s1.ebrainte.com:47000/user/registration";
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  try {
    let response = await fetch(endpoint, options);
    let responseStatus = response.status;
    let responseData = response.data;

    switch (responseStatus) {
      case 200: {
        return { rdo: 0, mensaje: "OK", data: responseData };
      }
      case 500: {
        return { rdo: 1, mensaje: "Hubo un problema en el registro" };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("Error on POST /user/registration", error);
    return { rdo: 1, mensaje: error };
  }
};

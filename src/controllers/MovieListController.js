const URL = "https://movie-distribuidas-back.herokuapp.com";

export const createMovieList = async (data) => {
  const endpoint = `${URL}/list/insertMovieList`;
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
        return { rdo: 1, mensaje: "Hubo un problema al crear la lista" };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("Error on POST /list/insertMovieList", error);
    return { rdo: 1, mensaje: error };
  }
};

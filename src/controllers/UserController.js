const URL = "https://movie-distribuidas-back.herokuapp.com";
//const URL = "http://s1.ebrainte.com:47000";

export const registration = async (data) => {
  const endpoint = `${URL}/user/registration`;
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

export const login = async (data) => {
  const endpoint = `${URL}/user/login`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(endpoint, options);
    let responseStatus = response.status;
    let responseData = await response.json();
    console.log(responseData);
    switch (responseStatus) {
      case 200: {
        return { rdo: 0, mensaje: "OK", data: responseData.userData };
      }
      case 500: {
        return { rdo: 1, mensaje: "Hubo un problema en el registro" };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("Error on POST /user/login", error);
    return { rdo: 1, mensaje: error };
  }
};

export const update = async (data) => {
  const endpoint = `${URL}/user/update`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    let response = await fetch(endpoint, options);
    let responseStatus = response.status;
    let responseData = await response.json();
    console.log(responseData);
    switch (responseStatus) {
      case 200: {
        return { rdo: 0, mensaje: "OK", data: responseData.userData };
      }
      case 500: {
        return { rdo: 1, mensaje: "Hubo un problema en el realizar el cambio" };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("Error on PATCH /user/update", error);
    return { rdo: 1, mensaje: error };
  }
};

export const getUsers = async function () {
  const endpoint = `${URL}/user`;
  let result = await fetch(endpoint);
  let apiResponse = await result.json();
  const users = apiResponse.data.docs;
  let userResponse = users.map((user) => ({
    name: user.email,
    id: user.email,
  }));
  return userResponse;
};

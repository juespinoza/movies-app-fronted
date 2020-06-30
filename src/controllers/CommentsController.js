const URL = "http://movie-distribuidas-back.herokuapp.com";
//const URL = "http://s1.ebrainte.com:47000";

export const getMovieAvgbyId = async (movieId) => {
  let data = { movieId: movieId };
  console.log("PIRULANGA");
  // console.log(data);
  const endpoint = `${URL}/api/getMovieAvgbyId`;
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  try {
    let response = await fetch(endpoint, options);
    let responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log("Error", error);
    return { rdo: 1, mensaje: error };
  }
};

export const getCommentsbyField = async (key, value) => {
  let data = { [key]: value };
  console.log(data);
  const endpoint = `${URL}/api/getCommentsbyField`;
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  try {
    let response = await fetch(endpoint, options);
    let responseData = await response.json();
    console.log("responsedata");
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log("Error", error);
    return { rdo: 1, mensaje: error };
  }
};

export const insertComment = async (
  movieId,
  userData,
  stars,
  date,
  comment
) => {
  let data = {
    movieId: movieId,
    email: userData.email,
    stars: stars,
    fullName: userData.fullName,
    date: date,
    body: comment,
  };
  console.log("Insertando comentario....");
  console.log(data);
  const endpoint = "http://s1.ebrainte.com:47000/api/insertComment";
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  try {
    let response = await fetch(endpoint, options);
    let responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log("Error", error);
    return { rdo: 1, mensaje: error };
  }
};

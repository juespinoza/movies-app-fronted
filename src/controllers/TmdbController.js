const createData = (item, idArray) => {
  const baseURLImg = "https://image.tmdb.org/t/p/w200";
  //console.log("createData", item);

  return {
    id: item.id,
    imagen: `${baseURLImg}${item.poster_path}`,
    title: item.title,
    release: item.release_date,
    popularity: item.popularity,
  };
};

export const getEstrenos = async function () {
  //Parametros de conexion
  const url = "https://api.themoviedb.org/3/discover/movie?api_key=";
  const discover =
    "&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1";
  const apiKEY = "af158ebf42ce4f8e554bcd0ba82df8dc";

  const endpoint = `${url}${apiKEY}${discover}`;
  let result = await fetch(endpoint);
  let apiResponse = await result.json();
  const estrenos = apiResponse.results;

  //Dar formato a los datos para mostrar en la grilla
  let estrenosAMostrar = [];
  let i;
  for (i = 0; i < estrenos.length; i++) {
    estrenosAMostrar.push(createData(estrenos[i], i));
  }
  //console.log("estrenos a mostrar", estrenosAMostrar);
  return estrenosAMostrar;
};

export const findByTitle = async function (movieName) {
  //Parametros de conexion
  const url = "https://api.themoviedb.org/3/search/movie?api_key=";
  const search = `${"&query="}${movieName}${"&page=1"}`;
  const apiKEY = "af158ebf42ce4f8e554bcd0ba82df8dc";

  const endpoint = `${url}${apiKEY}${search}`;
  let result = await fetch(endpoint);
  let apiResponse = await result.json();
  const movies = apiResponse.results;

  let foundMovies = [];
  let i;
  for (i = 0; i < movies.length; i++) {
    foundMovies.push(createData(movies[i], i));
  }
  //console.log("estrenos a mostrar", estrenosAMostrar);
  return foundMovies;
};


export const findByFilter = async function (sortby,order) {
  const url ="https://api.themoviedb.org/3/discover/movie?api_key=";
  const apiKEY="af158ebf42ce4f8e554bcd0ba82df8dc";
  // &language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
  const search= `${"&language=en-US&sort_by="}${sortby}.${order}${"&include_adult=false&include_video=false&page=1"}`;

  const endpoint = `${url}${apiKEY}${search}`;
  let result = await fetch(endpoint);
  let apiResponse = await result.json();
  const movies = apiResponse.results;

  let foundMovies = [];
  let i;
  for (i = 0; i < movies.length; i++) {
    foundMovies.push(createData(movies[i], i));
  }
  //console.log("estrenos a mostrar", estrenosAMostrar);
  return foundMovies;
};

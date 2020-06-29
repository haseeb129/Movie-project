const axios = require("axios");
async function getmoviearray() {
  let moviearray = [];
  await axios
    .get("http://localhost:5000/api/movie/get")
    .then((response) => {
      moviearray = response.data;
    })
    .catch((err) => {
      moviearray = null;
    });
  return moviearray;
}

async function findmoviebyid(id, movies) {
  let name = "No Movies";
  if (
    typeof id !== "undefined" &&
    id !== null &&
    typeof movies !== "undefined" &&
    movies !== null
  ) {
    let a = movies.find((element) => element._id === id);
    if (a) name = a.Name;
  }
  return name;
}

module.exports.findmoviebyid = findmoviebyid;
module.exports.getmoviearray = getmoviearray;

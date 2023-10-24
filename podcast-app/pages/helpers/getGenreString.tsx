const getGenreString = (showGenres: Array<string>) => {
  let genresString = "";
  if (showGenres) {
    for (let i = 0; i < showGenres.length; i++) {
      if (i === showGenres.length - 1) {
        genresString += `${showGenres[i]}.`;
      } else {
        genresString += `${showGenres[i].trim()}, `;
      }
    }
    return genresString;
  }
  return " ";
};

export default getGenreString;

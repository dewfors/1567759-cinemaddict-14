const filmToFilterMap = {
  all: (films) => films.length,
  watchlist: (films) => films
    .filter((film) => film.isFilmForWatch).length,
  history: (films) => films
    .filter((film) => film.isFilmInHistory).length,
  favorites: (films) => films
    .filter((film) => film.isFilmInFavorites).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};

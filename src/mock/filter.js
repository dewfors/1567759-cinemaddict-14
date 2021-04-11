// const filmToFilterMap = {
//   all: (films) => films.length,
//   watchlist: (films) => films
//     .filter((film) => film.isFilmForWatch).length,
//   history: (films) => films
//     .filter((film) => film.isFilmInHistory).length,
//   favorites: (films) => films
//     .filter((film) => film.isFilmInFavorites).length,
// };

const filmToFilterMap = {
  all: (films) => {
    return {text: 'All movies', count: films.length};
  },
  watchlist: (films) => {
    return {
      text: 'Watchlist ',
      count: films.filter((film) => film.isFilmForWatch).length,
    };
  },
  history: (films) => {
    return {
      text: 'History ',
      count: films.filter((film) => film.isFilmInHistory).length,
    };
  },
  favorites: (films) => {
    return {
      text: 'Favorites ',
      count: films.filter((film) => film.isFilmInFavorites).length,
    };
  },
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, propertyFilms]) => {
    return {
      name: filterName,
      properties: propertyFilms(films),
    };
  });
};

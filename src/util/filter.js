import {FilterType} from './const.js';

const filter = {
  [FilterType.ALL]: (films) => films.filter(() => true),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isFilmForWatch),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isFilmInHistory),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFilmInFavorites),
};

export {filter};

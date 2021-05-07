import {FilterType} from './const.js';
// import {isTaskExpired, isTaskExpiringToday, isTaskRepeating} from './task';

export const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => true),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isFilmForWatch),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isFilmInHistory),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFilmInFavorites),
};

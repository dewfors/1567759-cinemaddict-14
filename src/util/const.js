const FILM_COUNT_ALL_MOVIES = 24;
const FILM_COUNT_PER_STEP = 5;
const FILM_COUNT_TOP_RATED = 2;
const FILM_COUNT_MOST_COMMENTED = 2;

const COMMENT_MIN_COUNT = 0;
const COMMENT_MAX_COUNT = 5;

const DAYS_MIN_GAP = 170;
const DAYS_MAX_GAP = 70;

const SHORT_DESCRIPTION_MAX_LENGTH = 140;

const positionsToInsertElement = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const dataFormat = {
  FORMAT_YEAR_LONG: 'YYYY',
  FORMAT_DATE_LONG: 'D MMMM YYYY',
};

const keyEscapeFormat = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const BODY_HIDE_OVERFLOW_CLASS_NAME = 'hide-overflow';

const mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const TypeFilmList = {
  ALL_MOVIES: 'all_movies',
  TOP_RATED: 'top_rated',
  MOST_COMMENTED: 'most_commented',
};



export {
  FILM_COUNT_ALL_MOVIES, FILM_COUNT_PER_STEP, FILM_COUNT_TOP_RATED,
  FILM_COUNT_MOST_COMMENTED, COMMENT_MIN_COUNT, COMMENT_MAX_COUNT,
  DAYS_MIN_GAP, DAYS_MAX_GAP, SHORT_DESCRIPTION_MAX_LENGTH,
  positionsToInsertElement, dataFormat, BODY_HIDE_OVERFLOW_CLASS_NAME,
  keyEscapeFormat, mode
};

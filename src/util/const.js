const FILM_COUNT_ALL_MOVIES = 21;
const FILM_COUNT_PER_STEP = 5;
const FILM_COUNT_TOP_RATED = 2;
const FILM_COUNT_MOST_COMMENTED = 2;

const COMMENT_MIN_COUNT = 0;
const COMMENT_MAX_COUNT = 5;

const DAYS_MIN_GAP = 170;
const DAYS_MAX_GAP = 70;

const SHORT_DESCRIPTION_MAX_LENGTH = 140;

const PositionsToInsertElement = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const DataFormat = {
  FORMAT_YEAR_LONG: 'YYYY',
  FORMAT_DATE_LONG: 'D MMMM YYYY',
  FORMAT_DATE_TIME: 'YYYY/MM/DD HH:mm',
};

const KeyEscapeFormat = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const KeyCodes = {
  ENTER: 13,
};

const sortClassNameActive = 'sort__button--active';
const BODY_HIDE_OVERFLOW_CLASS_NAME = 'hide-overflow';
const deleteCommentButtonClassName = 'film-details__comment-delete';
const commentContainerClassName = 'film-details__comment';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const TypeFilmList = {
  ALL_MOVIES: 'all_movies',
  TOP_RATED: 'top_rated',
  MOST_COMMENTED: 'most_commented',
};

const emojiList = ['smile','sleeping','puke','angry'];

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  NONE: null,
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATS: 'stats',
};

const ButtonType = {
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorite',
};

const MenuItem = {
  FILMS: 'FILMS',
  STATISTICS: 'STATISTICS',
};

const DatePeriod = {
  ALL: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

const DateRanges = {
  YEARS: -2,
  MONTHS: 12,
  DAYS: 31,
};

const Rang = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};


const RangLevels = {
  NOVICE: {
    min: 1,
    max: 10,
  },
  FAN: {
    min: 11,
    max: 20,
  },
};

export {
  FILM_COUNT_ALL_MOVIES, FILM_COUNT_PER_STEP, FILM_COUNT_TOP_RATED,
  FILM_COUNT_MOST_COMMENTED, COMMENT_MIN_COUNT, COMMENT_MAX_COUNT,
  DAYS_MIN_GAP, DAYS_MAX_GAP, SHORT_DESCRIPTION_MAX_LENGTH,
  PositionsToInsertElement, DataFormat, BODY_HIDE_OVERFLOW_CLASS_NAME,
  KeyEscapeFormat, Mode, sortClassNameActive, KeyCodes, SortType,
  TypeFilmList, emojiList, UserAction, UpdateType, FilterType,
  deleteCommentButtonClassName, commentContainerClassName, ButtonType,
  MenuItem, DatePeriod, DateRanges, Rang, RangLevels
};

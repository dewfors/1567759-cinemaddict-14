const FILM_COUNT_PER_STEP = 5;
const FILM_COUNT_TOP_RATED = 2;
const FILM_COUNT_MOST_COMMENTED = 2;

const MINUTES_IN_HOUR = 60;

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
  INIT: 'INIT',
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

const ChartSettings = {
  TYPE: 'horizontalBar',
  DATASETS_BACKGROUND_COLOR: '#ffe800',
  DATASETS_HOVER_BACKGROUND_COLOR: '#ffe800',
  DATASETS_ANCHOR: 'start',
  DATALABELS_FONT_SIZE: 20,
  DATALABELS_COLOR: '#ffffff',
  DATALABELS_ANCHOR: 'start',
  DATALABELS_ALIGN: 'start',
  DATALABELS_OFFSET: 40,
  SCALES_Y_TICKS_FONT_COLOR: '#ffffff',
  SCALES_Y_TICKS_PADDING: 100,
  SCALES_Y_TICKS_FONT_SIZE: 20,
  SCALES_Y_GRIDLINES_DISPLAY: false,
  SCALES_Y_GRIDLINES_DRAW_BORDER: false,
  SCALES_Y_BAR_THICKNESS: 24,
  SCALES_X_TICKS_DISPLAY: false,
  SCALES_X_TICKS_BEGIN_AT_ZERO: true,
  SCALES_X_GRIDLINES_DISPLAY: false,
  SCALES_X_GRIDLINES_DRAW_BORDER: false,
  LEGEND_DISPLAY: false,
  TOOLTIPS_ENABLED: false,
};

const API_END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';
const API_AUTHORIZATION = 'Basic l3W285S60S6PWC0ah7hPjj9CEB7';

export {
  FILM_COUNT_PER_STEP, FILM_COUNT_TOP_RATED,
  FILM_COUNT_MOST_COMMENTED, SHORT_DESCRIPTION_MAX_LENGTH,
  PositionsToInsertElement, DataFormat, BODY_HIDE_OVERFLOW_CLASS_NAME,
  KeyEscapeFormat, Mode, sortClassNameActive, KeyCodes, SortType,
  TypeFilmList, emojiList, UserAction, UpdateType, FilterType,
  deleteCommentButtonClassName, commentContainerClassName, ButtonType,
  MenuItem, DatePeriod, DateRanges, Rang, RangLevels,
  API_AUTHORIZATION, API_END_POINT, MINUTES_IN_HOUR, ChartSettings
};

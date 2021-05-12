import AbstractView from './abstract.js';
import {SHORT_DESCRIPTION_MAX_LENGTH} from '../util/const.js';
import {formatDate, getTimeDuration} from '../util/common.js';

const getClassNameIsActive = (flag) => {
  return flag
    ? 'film-card__controls-item--active'
    : '';
};

const createFilmTemplate = (film) => {

  const {title, total_rating, release, runtime, genre, description, poster} = film;
  const year = formatDate(release.date);

  const hours = getTimeDuration(runtime).hours();
  const minutes = getTimeDuration(runtime).minutes();

  const currentGenre = genre[0];
  const shortDescription = description.length > SHORT_DESCRIPTION_MAX_LENGTH
    ? `${description.slice(0, SHORT_DESCRIPTION_MAX_LENGTH)}...`
    : description;
  const commentsCount = film.comments.length;

  const watchlistClassName = getClassNameIsActive(film.isFilmForWatch);
  const watchedClassName = getClassNameIsActive(film.isFilmInHistory);
  const favoriteClassName = getClassNameIsActive(film.isFilmInFavorites);


  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${total_rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${hours}h ${minutes}m</span>
            <span class="film-card__genre">${currentGenre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${shortDescription}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button" data-type="watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  ${watchedClassName}" type="button" data-type="history">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite  ${favoriteClassName}" type="button" data-type="favorite">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._controlButtonsClickHandler = this._controlButtonsClickHandler.bind(this);

    // this._posterClickHandler = this._posterClickHandler.bind(this);
    // this._titleClickHandler = this._titleClickHandler.bind(this);
    // this._commentsClickHandler = this._commentsClickHandler.bind(this);
    //
    // this._addWatchlistClickHandler = this._addWatchlistClickHandler.bind(this);
    // this._addWatchedClickHandler = this._addWatchedClickHandler.bind(this);
    // this._addFavoriteClickHandler = this._addFavoriteClickHandler.bind(this);
  }

  _controlButtonsClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonsClick(evt);
  }


  getTemplate() {
    return createFilmTemplate(this._film);
  }

  setControlButtonsClick(callback) {
    this._callback.buttonsClick = callback;
    this.getElement()
      .querySelector('.film-card__controls')
      .addEventListener('click', this._controlButtonsClickHandler);
  }

  // _posterClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.posterClick();
  // }
  //
  // _titleClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.titleClick();
  // }
  //
  // _commentsClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.commentsClick();
  // }
  //
  // _addWatchlistClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.addWatchlistClick();
  // }
  //
  // _addWatchedClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.addWatchedClick();
  // }
  //
  // _addFavoriteClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.addFavoriteClick();
  // }
  //
  // setPosterClickHandler(callback) {
  //   this._callback.posterClick = callback;
  //   this.getElement().querySelector('.film-card__poster').addEventListener('click', this._posterClickHandler);
  // }
  //
  // setTitleClickHandler(callback) {
  //   this._callback.titleClick = callback;
  //   this.getElement().querySelector('.film-card__title').addEventListener('click', this._titleClickHandler);
  // }
  //
  // setCommentsClickHandler(callback) {
  //   this._callback.commentsClick = callback;
  //   this.getElement().querySelector('.film-card__comments').addEventListener('click', this._commentsClickHandler);
  // }
  //
  // setAddWatchlistClickHandler(callback) {
  //   this._callback.addWatchlistClick = callback;
  //   this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._addWatchlistClickHandler);
  // }
  //
  // setAddWatchedClickHandler(callback) {
  //   this._callback.addWatchedClick = callback;
  //   this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._addWatchedClickHandler);
  // }
  //
  // setAddFavoriteClickHandler(callback) {
  //   this._callback.addFavoriteClick = callback;
  //   this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._addFavoriteClickHandler);
  // }

}


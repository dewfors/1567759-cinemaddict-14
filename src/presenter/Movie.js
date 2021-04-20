import FilmCardView from '../view/film-card.js';
import FilmPopupView from '../view/film-popup.js';
import {BODY_HIDE_OVERFLOW_CLASS_NAME, keyEscapeFormat, positionsToInsertElement} from '../util/const.js';
import {render, replace, remove} from '../util/render.js';


export default class Movie {
  constructor(movieListContainer, changeData) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._handleShowFilmPopupClick = this._handleShowFilmPopupClick.bind(this);
    this._handleHideFilmPopupClick = this._handleHideFilmPopupClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._siteBodyElement = document.querySelector('body');
  }

  init(film) {
    this._film = film;

    const prevfilmComponent = this._filmComponent;
    const prevfilmPopupComponent = this._filmPopupComponent;


    this._filmComponent = new FilmCardView(this._film);
    this._filmPopupComponent = new FilmPopupView(this._film);

    this._filmComponent.setPosterClickHandler(this._handleShowFilmPopupClick);
    this._filmComponent.setTitleClickHandler(this._handleShowFilmPopupClick);
    this._filmComponent.setCommentsClickHandler(this._handleShowFilmPopupClick);
    this._filmPopupComponent.setCloseClickHandler(this._handleHideFilmPopupClick);

    this._filmComponent.setAddWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setAddWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setAddFavoriteClickHandler(this._handleFavoriteClick);

    this._filmPopupComponent.setAddWatchlistClickHandler(this._handleWatchlistClick);
    this._filmPopupComponent.setAddWatchedClickHandler(this._handleWatchedClick);
    this._filmPopupComponent.setAddFavoriteClickHandler(this._handleFavoriteClick);

    if (prevfilmComponent === null || prevfilmPopupComponent === null) {
      render(this._movieListContainer, this._filmComponent, positionsToInsertElement.BEFOREEND);
      return;
    }

    if (this._movieListContainer.contains(prevfilmComponent.getElement())) {
      replace(this._filmComponent, prevfilmComponent);
    }

    if (this._siteBodyElement.contains(prevfilmPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevfilmPopupComponent);
    }

    remove(prevfilmComponent);
    remove(prevfilmPopupComponent);

  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }


  _showFilmPopup() {
    this._siteBodyElement.appendChild(this._filmPopupComponent.getElement());
    this._siteBodyElement.classList.add(BODY_HIDE_OVERFLOW_CLASS_NAME);
  }

  _hideFilmPopup() {
    this._siteBodyElement.removeChild(this._filmPopupComponent.getElement());
    this._siteBodyElement.classList.remove(BODY_HIDE_OVERFLOW_CLASS_NAME);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === keyEscapeFormat.ESCAPE || evt.key === keyEscapeFormat.ESC) {
      evt.preventDefault();
      this._hideFilmPopup();
      document.removeEventListener('keydown', this._handleEscKeyDown);
    }
  }

  _handleShowFilmPopupClick() {
    this._showFilmPopup();
    document.addEventListener('keydown', this._handleEscKeyDown);
  }

  _handleHideFilmPopupClick() {
    this._hideFilmPopup();
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFilmForWatch: !this._film.isFilmForWatch,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFilmInHistory: !this._film.isFilmInHistory,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFilmInFavorites: !this._film.isFilmInFavorites,
        },
      ),
    );
  }

}

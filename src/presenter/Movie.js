import FilmCardView from '../view/film-card.js';
import FilmPopupView from '../view/film-popup.js';
import {BODY_HIDE_OVERFLOW_CLASS_NAME, keyEscapeFormat, positionsToInsertElement} from '../util/const.js';
import {render} from '../util/render.js';


export default class Movie {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._handleShowFilmPopupClick = this._handleShowFilmPopupClick.bind(this);
    this._handleHideFilmPopupClick = this._handleHideFilmPopupClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._siteBodyElement = document.querySelector('body');
  }

  init(film) {
    this._film = film;

    this._filmComponent = new FilmCardView(this._film);
    this._filmPopupComponent = new FilmPopupView(this._film);

    this._filmComponent.setPosterClickHandler(this._handleShowFilmPopupClick);
    this._filmComponent.setTitleClickHandler(this._handleShowFilmPopupClick);
    this._filmComponent.setCommentsClickHandler(this._handleShowFilmPopupClick);
    this._filmPopupComponent.setCloseClickHandler(this._handleHideFilmPopupClick);

    render(this._movieListContainer, this._filmComponent, positionsToInsertElement.BEFOREEND);
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
}

import FilmCardView from '../view/film-card.js';
import AbstractPresenter from './abstract-presenter.js';
import {PositionsToInsertElement} from '../util/const.js';
import {render, replace, remove} from '../util/render.js';


export default class Movie extends AbstractPresenter {
  constructor(movieListContainer, filmsModel, commentsModel, changeData) {
    super();
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._handleControlButtons = this._handleControlButtons.bind(this);

    this._filmComponent = null;
  }

  isThisFilm(filmId) {
    return this._film && this._film.id === filmId;
  }

  init(film) {
    this._film = film;

    const prevfilmComponent = this._filmComponent;

    this._filmComponent = new FilmCardView(this._film);
    this._filmComponent.setControlButtonsClick(this._handleControlButtons);

    if (prevfilmComponent === null) {
      render(this._movieListContainer, this._filmComponent, PositionsToInsertElement.BEFOREEND);
      return;
    }

    replace(this._filmComponent, prevfilmComponent);

    remove(prevfilmComponent);

  }

  destroy() {
    remove(this._filmComponent);
  }

}

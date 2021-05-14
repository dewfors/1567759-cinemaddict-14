import AbstractView from './abstract.js';

const createFilmsListAllMoviesTemplate = () => {
  return `<section class="films-list films-list--all-movies">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class FilmsListAllMovies extends AbstractView {

  constructor() {
    super();
    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmsListAllMoviesTemplate();
  }

  _filmCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.filmCardClick(evt);
  }

  setFilmCardClickHandler(callback) {
    this._callback.filmCardClick = callback;
    this.getElement().addEventListener('click', this._filmCardClickHandler);
  }

  removeFilmCardClickHandler() {
    this.getElement().removeEventListener('click', this._filmCardClickHandler);
  }


}

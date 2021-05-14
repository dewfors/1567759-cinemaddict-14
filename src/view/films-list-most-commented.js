import AbstractView from './abstract.js';

const createFilmsListMostCommentedTemplate = () => {
  return `<section class="films-list films-list--extra  films-list--most-commented">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class FilmsListMostCommented extends AbstractView {

  constructor() {
    super();
    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmsListMostCommentedTemplate();
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

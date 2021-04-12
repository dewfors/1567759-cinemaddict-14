import {createElement} from '../util/utils.js';

const createFilmsStatisticsTemplate = (films) => {
  const filmsCount = films.length;
  return `<p>
            ${filmsCount} movies inside
          </p>`;
};

export default class FilmsStatistics {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmsStatisticsTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

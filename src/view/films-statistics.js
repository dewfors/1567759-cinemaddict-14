import AbstractView from './abstract.js';

const createFilmsStatisticsTemplate = (films) => {
  const filmsCount = films.length;
  return `<p>
            ${filmsCount} movies inside
          </p>`;
};

export default class FilmsStatistics extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmsStatisticsTemplate(this._films);
  }
}

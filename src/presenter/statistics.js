import StatisticsView from '../view/statistics.js';
import { remove, render, replace } from '../util/render.js';
import { filter } from '../util/filter.js';
import { FilterType } from '../util/const.js';

export default class Stats {
  constructor(container, filmsModel) {
    this._films = filmsModel.getFilms();
    this._container = container;
    this._statisticsComponent = null;
  }

  init() {
    const prevStatsComponent = this._statisticsComponent;
    const aaa = filter[FilterType.HISTORY](this._films);
    console.log(aaa);
    this._statisticsComponent = new StatisticsView();

    if (prevStatsComponent === null) {
      render(this._container, this._statisticsComponent);
      return;
    }

    replace(prevStatsComponent, this._statisticsComponent);
    remove(prevStatsComponent);
  }

  destroy() {
    remove(this._statisticsComponent);
  }
}

import SmartView from './smart.js';
import {calcChart} from '../util/statistics.js';
import {DatePeriod} from '../util/const.js';
import {getDatePeriod, getSortedGenres, getRangUser} from '../util/common.js';
import {isDateInRange, humanizeDuration} from '../util/date.js';

const getStatistics = (films) => {
  const viewedFilmsCount = films.length;
  if (viewedFilmsCount === 0) {
    return {
      viewedFilmsCount: 0,
      totalDuration: false,
      topGenre: false,
    };
  }

  const totalDuration = films.reduce((duration, filmItem) => duration + filmItem.runtime, 0);
  // console.log(totalDuration);
  const topGenre = getSortedGenres(films)[0][0];
  return {
    viewedFilmsCount,
    totalDuration: humanizeDuration(totalDuration, {asObject: true}),
    topGenre,
  };
};

const formatNumber = (number) => {
  if (number < 10) {
    number = '0' + number.toString();
  }
  return number;
};

const getStringPeriod = (period) => {
  return (period[0].toUpperCase() + period.slice(1)).replace(/-/g , ' ');
};

const createStatisticsTemplate = (state, films) => {
  const {period, filmsPeriod} = state;
  const filmsCount = films.length;
  const {viewedFilmsCount, totalDuration, topGenre} = getStatistics(filmsPeriod);
  const setChecked = (value) => period === value ? 'checked' : '';


  const createTotalDurationElement = () => {
    return totalDuration
      ? `${formatNumber(totalDuration.hours)}<span class="statistic__item-description">h</span> ${formatNumber(totalDuration.minutes)} <span class="statistic__item-description">m</span>`
      : 'No movies';
  };

  const createStatisticsElement = () => {
    let statsFiltersElement = '';
    Object.values(DatePeriod).forEach((period) => {
      return statsFiltersElement = statsFiltersElement + `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${period}" value="${period}" ${setChecked(period)}>
      <label for="statistic-${period}" class="statistic__filters-label">${getStringPeriod(period)}</label>`;
    });
    return statsFiltersElement;
  };

  return `<section class="statistic">
  ${filmsCount
    ? `<p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${getRangUser(filmsCount)}</span>
  </p>`
    : ''}

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    ${createStatisticsElement()}
  </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${viewedFilmsCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${createTotalDurationElement()}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre ? topGenre : 'No movies'}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends SmartView {

  constructor(films) {
    super();
    this._films = films;
    this._state = {period: DatePeriod.all, filmsPeriod: this._getFilmsByPeriod(DatePeriod.all, this._films)};

    this._periodClickHandler = this._periodClickHandler.bind(this);
    this._setPeriodClickHandler();

    this._calcChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._state, this._films);
  }

  restoreHandlers() {
    this._setPeriodClickHandler();
    this._calcChart();
  }

  _calcChart() {
    const statisticsCtx = this.getElement().querySelector('.statistic__chart');
    calcChart(statisticsCtx, this._state);
  }

  _periodClickHandler(evt) {
    const target = evt.target;
    const isPeriod = (target) => target.classList.contains('statistic__filters-input');
    if (!isPeriod(target)) {
      return;
    }
    this.updateState({
      period: target.value,
      filmsPeriod: this._getFilmsByPeriod(target.value, this._films),
    });

  }

  _getFilmsByPeriod(period, films) {
    const filmsByPeriod = [];
    if (period === DatePeriod.all) {
      return films.slice();
    }
    const dateFrom = getDatePeriod(period);
    films.forEach((film) => {
      const filmViewedDate = film.dateViewed;
      if (isDateInRange(filmViewedDate, dateFrom)) {
        filmsByPeriod.push(film);
      }
    });
    return filmsByPeriod;
  }

  _setPeriodClickHandler() {
    this.getElement().querySelector('.statistic__filters')
      .addEventListener('click', this._periodClickHandler);
  }

  updateState(update) {
    if (!update) {
      return;
    }
    this._state = {...this._state, ...update};
    this.updateElement();
  }
}

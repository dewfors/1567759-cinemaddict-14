import AbstractView from './abstract.js';
import {FilterType} from '../util/const.js';

const LINK_ACTIVE_CLASS_NAME = 'main-navigation__item--active';

const createFilterTemplate = (filterItems, currentFilterType, filterState) => {
  const watchlistCount = filterItems.filter((filterItem) => filterItem.type === FilterType.WATCHLIST)[0].count;
  const watchCount = filterItems.filter((filterItem) => filterItem.type === FilterType.HISTORY)[0].count;
  const favoriteCount = filterItems.filter((filterItem) => filterItem.type === FilterType.FAVORITES)[0].count;
  const isStatsActive = filterState.isStatisticsActive;

  if (isStatsActive) {
    currentFilterType = FilterType.NONE;
  }

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item ${currentFilterType === FilterType.ALL ? LINK_ACTIVE_CLASS_NAME : ''}" data-filter="all">All movies</a>
    <a href="#watchlist" class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? LINK_ACTIVE_CLASS_NAME : ''}" data-filter="watchlist">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
    <a href="#history" class="main-navigation__item ${currentFilterType === FilterType.HISTORY ? LINK_ACTIVE_CLASS_NAME : ''}" data-filter="history">History <span class="main-navigation__item-count">${watchCount}</span></a>
    <a href="#favorites" class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? LINK_ACTIVE_CLASS_NAME : ''}" data-filter="favorites">Favorites <span class="main-navigation__item-count">${favoriteCount}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional ${isStatsActive ? LINK_ACTIVE_CLASS_NAME : ''}" data-filter="stats">Stats</a>
  </nav>`;

};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType, state) {
    super();
    this._filters = filters;
    this._currentFilter = state.activeFilter;
    this._filterState = state;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter, this._filterState);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    const isLinkActive = (link) => {
      link.classList.contains(LINK_ACTIVE_CLASS_NAME);
    };
    if (isLinkActive(evt.target)) {
      return;
    }

    this._callback.filterTypeChange(evt.target.dataset.filter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}

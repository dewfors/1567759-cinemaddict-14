import AbstractView from './abstract.js';
import {SortType} from '../util/const.js';

const getClassNameIsActive = () => {
  return 'sort__button--active';
};

const createSortTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends AbstractView {
  constructor(sortType) {
    super();

    this._sortType = sortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    // - убираем класс sort__button--active
    const activeElement = this.getElement().querySelector(`a[data-sort-type="${this._sortType}"]`);
    activeElement.classList.remove(getClassNameIsActive());

    // - устанавливаем класс sort__button--active
    this._sortType = evt.target.dataset.sortType;
    const newActiveElement = this.getElement().querySelector(`a[data-sort-type="${this._sortType}"]`);
    newActiveElement.classList.add(getClassNameIsActive());

    evt.preventDefault();
    this._callback.sortTypeChange(this._sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

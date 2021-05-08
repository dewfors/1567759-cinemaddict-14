import AbstractView from './abstract.js';
// import {SortType, sortClassNameActive} from '../util/const.js';
import {SortType} from '../util/const.js';

// const getClassNameIsActive = () => {
//   return 'sort__button--active';
// };

const createSortTemplate = (currentSortType) => {

  // console.log(currentSortType === SortType.DEFAULT);

  return `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.RATING ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();

    // this._sortType = sortType;
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {

    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    // // - убираем класс sort__button--active
    // const activeElement = this.getElement().querySelector(`a[data-sort-type="${this._sortType}"]`);
    // activeElement.classList.remove(sortClassNameActive);
    //
    // // - устанавливаем класс sort__button--active
    // this._sortType = evt.target.dataset.sortType;
    // const newActiveElement = this.getElement().querySelector(`a[data-sort-type="${this._sortType}"]`);
    // newActiveElement.classList.add(sortClassNameActive);

    this._currentSortType = evt.target.dataset.sortType;

    evt.preventDefault();
    // this._callback.sortTypeChange(this._sortType);

    // console.log(evt.target.dataset.sortType);
    // console.log(this._currentSortType);
    // this._callback.sortTypeChange(evt.target.dataset.sortType);
    this._callback.sortTypeChange(this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

import AbstractView from './abstract.js';

const createFilterCountTemplate = (count, isActive) => {
  return (
    isActive ? '' : `<span class="main-navigation__item-count">${count}</span>`
  );
};

// const createFilterItemTemplate = (filter, isActive) => {
const createFilterItemTemplate = (filter, currentFilterType) => {
  // const {name, properties} = filter;
  const {type, name, count} = filter;

  // const linkActiveClassName = !isActive ? '' : 'main-navigation__item--active';
  // const linkClassName = `main-navigation__item ${linkActiveClassName}`;
  //
  // const filterCountTemplate = createFilterCountTemplate(properties.count, isActive);

  // return (
  //   `<a
  //       href="#${name}"
  //       class="${linkClassName}"
  //       >
  //       ${properties.text} ${filterCountTemplate}
  //       </a>`
  // );

  const isActive = type === currentFilterType;
  const linkActiveClassName = !isActive ? '' : 'main-navigation__item--active';
  const linkClassName = `main-navigation__item ${linkActiveClassName}`;

  const filterCountTemplate = createFilterCountTemplate(count, isActive);


  return (
    `<a
        href="#${type}"
        class="${linkClassName}"
        data-filter = "${type}"
        >
        ${name} ${filterCountTemplate}
        </a>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    // .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<section class="main-navigation__items">
    ${filterItemsTemplate}
  </section>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    // this._callback.filterTypeChange(evt.target.value);
    this._callback.filterTypeChange(evt.target.dataset.filter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    // this.getElement().addEventListener('change', this._filterTypeChangeHandler);
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}

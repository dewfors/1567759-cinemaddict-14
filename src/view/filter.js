import {createElement} from '../util/utils.js';

const createFilterCountTemplate = (count, isActive) => {
  return (
    isActive ? '' : `<span class="main-navigation__item-count">${count}</span>`
  );
};

const createFilterItemTemplate = (filter, isActive) => {
  const {name, properties} = filter;

  const linkActiveClassName = !isActive ? '' : 'main-navigation__item--active';
  const linkClassName = `main-navigation__item ${linkActiveClassName}`;

  const filterCountTemplate = createFilterCountTemplate(properties.count, isActive);

  return (
    `<a
        href="#${name}"
        class="${linkClassName}"
        >
        ${properties.text} ${filterCountTemplate}
        </a>`
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<section class="main-navigation__items">
    ${filterItemsTemplate}
  </section>`;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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

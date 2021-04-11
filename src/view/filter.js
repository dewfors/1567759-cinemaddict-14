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

export const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<section class="main-navigation__items">
    ${filterItemsTemplate}
  </section>`;
};

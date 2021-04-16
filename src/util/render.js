import Abstract from '../view/abstract.js';
import {positionsToInsertElement} from './const.js';

export const render = (container, element, place = positionsToInsertElement.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case positionsToInsertElement.AFTERBEGIN:
      container.prepend(element);
      break;
    case positionsToInsertElement.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
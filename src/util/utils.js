import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import {DAYS_MIN_GAP, DAYS_MAX_GAP, positionsToInsertElement} from './const.js';

dayjs.extend(duration);

export const renderElement = (container, element, place = positionsToInsertElement.BEFOREEND) => {

  // console.log(place);

  switch (place) {
    case positionsToInsertElement.AFTERBEGIN:
      container.prepend(element);
      break;
    case positionsToInsertElement.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place = positionsToInsertElement.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomiseArray = (array, countOfElements) => {
  const copyArray = array.slice();

  const result = [];
  while (copyArray.length > countOfElements) {
    const random = getRandomInteger(0, copyArray.length - 1);
    const elem = copyArray.splice(random, 1)[0];
    result.push(elem);
  }

  return result.slice(0, countOfElements);
};

const sortFilmsByRating = (objectA, objectB) => {
  const rankA = objectA.total_rating;
  const rankB = objectB.total_rating;

  return rankB - rankA;
};

const sortFilmsByCommetns = (pictureA, pictureB) => {
  const rankA = pictureA.comments.length;
  const rankB = pictureB.comments.length;

  return rankB - rankA;
};

const getSortFilms = (filmsToSort, sortFunction) => {
  return filmsToSort.slice().sort(sortFunction);
};

const generateDate = () => {
  const daysGap = getRandomInteger(-DAYS_MIN_GAP, -DAYS_MAX_GAP);
  return dayjs().add(daysGap, 'day').toDate();
};

const formatDate = (value, format = 'YYYY') => {
  return dayjs(value).format(format);
};

const getTimeDuration = (count, format = 'm') => {
  return dayjs.duration(count, format);
};

const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

export {
  getRandomInteger, getRandomiseArray, generateDate,
  formatDate, getTimeDuration, renderTemplate, getSortFilms,
  sortFilmsByRating, sortFilmsByCommetns, getRandomBoolean
};

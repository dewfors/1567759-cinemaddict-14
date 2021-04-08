import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import {DAYS_MIN_GAP, DAYS_MAX_GAP,positionsToInsertElement} from './const.js';

dayjs.extend(duration);

const render = (container, template, place = positionsToInsertElement.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
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
    const random = getRandomInteger(0, copyArray.length-1);
    const elem = copyArray.splice(random, 1)[0];
    result.push(elem);
  }

  return result.slice(0, countOfElements);
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

export {getRandomInteger, getRandomiseArray, generateDate,formatDate, getTimeDuration, render};

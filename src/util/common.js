import {DAYS_MIN_GAP, DAYS_MAX_GAP, DatePeriod} from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import {Rang, RangLevels} from './const.js';


dayjs.extend(duration);

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

const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getSortedGenres = (films) => {
  const genresMap = new Map();
  films.forEach((filmItem) => {
    filmItem.genre.forEach((genre) => {
      const counter = genresMap.get(genre) + 1 || 1;
      genresMap.set(genre, counter);
    });
  });
  return [...genresMap.entries()].sort((a, b) => b[1] - a[1]);
};

const getDatePeriod = (period) => {
  switch (period) {
    case DatePeriod.today:
      return dayjs().toDate();
    case DatePeriod.week:
      return dayjs().subtract(6, 'day').toDate();
    case DatePeriod.month:
      return dayjs().subtract(1, 'month').toDate();
    case DatePeriod.year:
      return dayjs().subtract(1, 'year').toDate();
  }
};

// ранг пользователя
const getRangUser = (filmsCount) => {
  const { novice, fan } = RangLevels;
  if (!filmsCount) {
    return false;
  }
  if (filmsCount >= novice.min && filmsCount <= novice.max) {
    return Rang.novice;
  } else if (filmsCount >= fan.min && filmsCount <= fan.max) {
    return Rang.fan;
  } else {
    return Rang.movieBuff;
  }
};

export {
  getRandomInteger, getRandomiseArray, getRandomBoolean,
  generateDate, formatDate, getTimeDuration, getSortedGenres,
  getDatePeriod, getRangUser
};

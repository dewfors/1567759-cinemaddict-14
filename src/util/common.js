import {DatePeriod} from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import {Rank, RankLevels} from './const.js';


dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const formatDate = (value, format = 'YYYY') => {
  return dayjs(value).format(format);
};

const getTimeDuration = (count, format = 'm') => {
  return dayjs.duration(count, format);
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
    case DatePeriod.TODAY:
      return dayjs().toDate();
    case DatePeriod.WEEK:
      return dayjs().subtract(6, 'day').toDate();
    case DatePeriod.MONTH:
      return dayjs().subtract(1, 'month').toDate();
    case DatePeriod.YEAR:
      return dayjs().subtract(1, 'year').toDate();
  }
};

const getRangUser = (filmsCount) => {
  const { NOVICE, FAN } = RankLevels;
  if (!filmsCount) {
    return false;
  }
  if (filmsCount >= NOVICE.min && filmsCount <= NOVICE.max) {
    return Rank.NOVICE;
  } else if (filmsCount >= FAN.min && filmsCount <= FAN.max) {
    return Rank.FAN;
  } else {
    return Rank.MOVIE_BUFF;
  }
};

export {
  getRandomInteger,
  formatDate, getTimeDuration, getSortedGenres,
  getDatePeriod, getRangUser
};

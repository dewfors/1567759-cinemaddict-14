import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBefore from 'dayjs/plugin/isSameOrBefore';
import {DateRanges} from './const.js';
import {getRandomInteger} from './common.js';

const isDateInRange = (currentDate, dateFrom) => {
  dayjs.extend(isBefore);
  return dayjs(dateFrom).isSameOrBefore(currentDate);
};

const getRandomDate = () => {
  dayjs.extend(isSameOrBefore);
  const randomDate = dayjs().add(getRandomInteger(DateRanges.years), 'year')
    .add(getRandomInteger(DateRanges.months), 'month')
    .add(getRandomInteger(DateRanges.days), 'day')
    .toDate();

  return dayjs().isBefore(dayjs(randomDate))
    ? dayjs().toDate()
    : randomDate;
};

const humanizeDuration = (duration, {asObject = false} = {}) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if (asObject) {
    return {
      hours,
      minutes,
    };
  }
  return `${hours}h ${minutes}m`;
};

export {isDateInRange, getRandomDate, humanizeDuration};

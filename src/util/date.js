import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBefore from 'dayjs/plugin/isSameOrBefore';
import {DateRanges, MINUTES_IN_HOUR} from './const.js';
import {getRandomInteger} from './common.js';

dayjs.extend(isBefore);
dayjs.extend(isSameOrBefore);


const isDateInRange = (currentDate, dateFrom) => {
  // dayjs.extend(isBefore);
  return dayjs(dateFrom).isSameOrBefore(currentDate);
};

const getRandomDate = () => {
  // dayjs.extend(isSameOrBefore);
  const randomDate = dayjs().add(getRandomInteger(DateRanges.YEARS), 'year')
    .add(getRandomInteger(DateRanges.MONTHS), 'month')
    .add(getRandomInteger(DateRanges.DAYS), 'day')
    .toDate();

  return dayjs().isBefore(dayjs(randomDate))
    ? dayjs().toDate()
    : randomDate;
};

const humanizeDuration = (duration, {asObject = false} = {}) => {
  const hours = Math.trunc(duration / MINUTES_IN_HOUR);
  const minutes = duration % MINUTES_IN_HOUR;
  if (asObject) {
    return {
      hours,
      minutes,
    };
  }
  return `${hours}h ${minutes}m`;
};

export {isDateInRange, getRandomDate, humanizeDuration};

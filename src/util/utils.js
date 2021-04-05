import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomiseArray = (array, countOfElements) => {
  const copyArray = array.slice();

  const result = [];
  while (copyArray.length > 0) {
    const random = getRandomInteger(0, copyArray.length-1);
    const elem = copyArray.splice(random, 1)[0];
    result.push(elem);
  }

  return result.slice(0, countOfElements);
};

const generateDate = () => {
  const minDaysGap = 170;
  const maxDaysGap = 70;
  const daysGap = getRandomInteger(-minDaysGap, -maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};


export {getRandomInteger, getRandomiseArray, generateDate};

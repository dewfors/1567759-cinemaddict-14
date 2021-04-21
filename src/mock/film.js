import {getRandomInteger, getRandomiseArray, getRandomBoolean} from '../util/common.js';
import {generateComment} from './comment.js';
import {COMMENT_MIN_COUNT, COMMENT_MAX_COUNT} from '../util/const.js';

import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const generateDate = () => {
  const minDaysGap = 170;
  const maxDaysGap = 70;
  const daysGap = getRandomInteger(-minDaysGap, -maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateReleaseCountry = () => {
  const countries = [
    'Belgium',
    'Gambia',
    'Colombia',
    'Mexico',
    'Russia',
    'Turkey',
    'USA',
    'Brazil',
    'United Kingdom',
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateRelease = () => {
  return {
    date: generateDate(),
    release_country: generateReleaseCountry(),
  };
};


const generateTitle = (isAlternativeTitle = false) => {
  const titles = [
    'Лига справедливости',
    'Охотники на монстров',
    'Ведьмы',
    'Аннигиляция',
    'Последний богатырь',
    'Петля времени',
    'Аватар',
    'Чудо-женщина',
    'Пиксели',
  ];

  const alternativeTitles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Made for Each Other',
  ];

  const randomIndex = !isAlternativeTitle
    ? getRandomInteger(0, titles.length - 1)
    : getRandomInteger(0, alternativeTitles.length - 1);

  return !isAlternativeTitle
    ? titles[randomIndex]
    : alternativeTitles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);
  return posters[randomIndex];
};

const generateDirector = () => {
  const directors = [
    'Amy Lynne Seimetz',
    'Peter Sullivan',
    'Richard Allan Salomon',
    'Christopher Michael Sanders',
    'Adam Richard Sandler',
    'Jennifer Siebel',
    'Steven Seagal',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);
  return directors[randomIndex];
};

const generateActors = () => {
  const actors = [
    'Al Pacino',
    'Audrey Hepburn',
    'Bill Murray',
    'Brittany Murphy',
    'Bruce Willis',
    'Cuba Gooding Jr.',
    'Danny DeVito',
  ];

  const actorsMinCount = 1;
  const actorsMaxCount = actors.length - 1;
  const randomCountActors = getRandomInteger(actorsMinCount, actorsMaxCount);
  return getRandomiseArray(actors, randomCountActors);
};

const generateWriters = () => {
  const writers = [
    'Quentin Tarantino',
    'Hayao Miyazaki',
    'Takeshi Kitano',
    'Wes Anderson',
    'Martin Scorsese',
    'Steven Spielberg',
    'Stanley Kubrick',
  ];

  const writersMinCount = 1;
  const writersMaxCount = 2;
  const randomCountWriters = getRandomInteger(writersMinCount, writersMaxCount);
  return getRandomiseArray(writers, randomCountWriters);
};

const generateGenre = () => {
  const genre = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
    'Mystery',
  ];

  const genreMinCount = 1;
  const genreMaxCount = 2;
  const randomCountGenre = getRandomInteger(genreMinCount, genreMaxCount);
  return getRandomiseArray(genre, randomCountGenre);
};

const generateDescription = () => {
  const descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

  const descriptionSentenceMin = 1;
  const descriptionSentenceMax = 5;

  const descriptionArray = descriptionText.split('.')
    .map((text) => text.trim())
    .filter((text) => text.length > 0);

  const randomCountDescriptionSentence = getRandomInteger(descriptionSentenceMin, descriptionSentenceMax);
  const randomDescriptionArray = getRandomiseArray(descriptionArray, randomCountDescriptionSentence);
  return randomDescriptionArray.join('. ').trim() + '.';
};


const generateComments = () => {
  const randomCountComments = getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT);
  return new Array(randomCountComments).fill().map(generateComment);
};


export const generateFilm = () => {
  const genre = generateGenre();
  const isSeveralGenres = genre.length > 1;

  return {
    id: nanoid(),
    title: generateTitle(),
    alternative_title: generateTitle(true),
    total_rating: getRandomInteger(3, 9),
    poster: `${generatePoster()}`,
    age_rating: 0,
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: generateRelease(),
    runtime: getRandomInteger(45, 230),
    genre,
    isSeveralGenres,
    description: generateDescription(),
    comments: generateComments(),
    isFilmForWatch: getRandomBoolean(),
    isFilmInHistory: getRandomBoolean(),
    isFilmInFavorites: getRandomBoolean(),
  };
};

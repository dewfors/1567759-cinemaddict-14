import dayjs from 'dayjs';

const sortFilmsByDate = (filmA, filmB) => {
  return dayjs(filmB.release.date).diff(dayjs(filmA.release.date));
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

export {
  getSortFilms, sortFilmsByRating, sortFilmsByCommetns, sortFilmsByDate
};

import {renderTemplate, getSortFilms, sortFilmsByRating, sortFilmsByCommetns} from './util/utils.js';
import {createProfileTemplate} from './view/profile.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmsTemplate} from './view/films.js';
import {createFilmTemplate} from './view/film-card.js';
import {createButtonMoreTemplate} from './view/more-button.js';
import {createFilmsStatisticsTemplate} from './view/films-statistics.js';
import {generateFilm} from './mock/film.js';
// import {getComments} from './mock/comment.js';
import {
  FILM_COUNT_ALL_MOVIES,
  FILM_COUNT_PER_STEP,
  FILM_COUNT_TOP_RATED,
  FILM_COUNT_MOST_COMMENTED
} from './util/const.js';
// import {createFilmPopupTemplate} from './view/film-popup.js';

const films = new Array(FILM_COUNT_ALL_MOVIES).fill().map(generateFilm);

const filmsTopRated = getSortFilms(films, sortFilmsByRating);
const filmsMostCommented = getSortFilms(films, sortFilmsByCommetns);

// const comments = getComments();
// console.log(films[1].comments.map((id) => comments[id]));
// console.log(films);

// const siteBodyElement = document.querySelector('body');
// render(siteBodyElement, createFilmPopupTemplate(films[0]));

const siteHeaderElement = document.querySelector('.header');
renderTemplate(siteHeaderElement, createProfileTemplate());

const siteMainElement = document.querySelector('.main');

renderTemplate(siteMainElement, createSortTemplate());
renderTemplate(siteMainElement, createSiteMenuTemplate());
renderTemplate(siteMainElement, createFilmsTemplate());

const filmsElement = siteMainElement.querySelector('.films');
const filmListAllMovies = filmsElement.querySelector('.films-list--all-movies');
const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');

// All movies
const filmListContainerAllMovies = filmListAllMovies.querySelector('.films-list__container');
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(filmListContainerAllMovies, createFilmTemplate(films[i]));
}
if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderTemplate(filmListAllMovies, createButtonMoreTemplate());

  const showMoreButton = filmListAllMovies.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmListContainerAllMovies, createFilmTemplate(film)));

    renderedFilmCount += FILM_COUNT_PER_STEP;
    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }

  });
}


// Top rated
const filmListContainerTopRated = filmListTopRated.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT_TOP_RATED; i++) {
  renderTemplate(filmListContainerTopRated, createFilmTemplate(filmsTopRated[i]));
}

// Most commented
const filmListContainerMostCommented = filmListMostCommented.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT_MOST_COMMENTED; i++) {
  renderTemplate(filmListContainerMostCommented, createFilmTemplate(filmsMostCommented[i]));
}

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
renderTemplate(siteFooterStatisticsElement, createFilmsStatisticsTemplate(films));

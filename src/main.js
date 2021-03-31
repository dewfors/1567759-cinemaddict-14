import {createProfileTemplate} from './view/profile.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmsTemplate} from './view/films.js';
import {createFilmTemplate} from './view/film-card.js';
import {createButtonMoreTemplate} from './view/more-button.js';
import {createFilmsStatisticsTemplate} from './view/films-statistics.js';
// import {createFilmPopupTemplate} from './view/film-popup.js';

const FILM_COUNT_ALL_MOVIES = 5;
const FILM_COUNT_TOP_RATED = 2;
const FILM_COUNT_MOST_COMMENTED = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, createProfileTemplate(), 'beforeend');

const siteMainElement = document.querySelector('.main');

render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = siteMainElement.querySelector('.films');
const filmListAllMovies = filmsElement.querySelector('.films-list--all-movies');
const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');

// All movies
const filmListContainerAllMovies = filmListAllMovies.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT_ALL_MOVIES; i++) {
  render(filmListContainerAllMovies, createFilmTemplate(), 'beforeend');
}
render(filmListAllMovies, createButtonMoreTemplate(), 'beforeend');

// Top rated
const filmListContainerTopRated = filmListTopRated.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT_TOP_RATED; i++) {
  render(filmListContainerTopRated, createFilmTemplate(), 'beforeend');
}

// Most commented
const filmListContainerMostCommented = filmListMostCommented.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT_MOST_COMMENTED; i++) {
  render(filmListContainerMostCommented, createFilmTemplate(), 'beforeend');
}

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
render(siteFooterStatisticsElement, createFilmsStatisticsTemplate(), 'beforeend');

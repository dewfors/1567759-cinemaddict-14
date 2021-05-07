import {PositionsToInsertElement, FILM_COUNT_ALL_MOVIES} from './util/const.js';
import {render} from './util/render.js';
// import {getSortFilms, sortFilmsByRating, sortFilmsByCommetns} from './util/film.js';
import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';

import FilmsStatisticsView from './view/films-statistics.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import MovieListPresenter from './presenter/MovieList.js';


// films list
const films = new Array(FILM_COUNT_ALL_MOVIES).fill().map(generateFilm);
// const filmsTopRated = getSortFilms(films, sortFilmsByRating);
// const filmsMostCommented = getSortFilms(films, sortFilmsByCommetns);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

// filters list
const filters = generateFilter(films);

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');

const renderHeader = () => {
  // user profile
  const siteHeaderElement = siteBodyElement.querySelector('.header');
  const profileComponent = new ProfileView();
  render(siteHeaderElement, profileComponent);
};

const renderNavigation = () => {
  // main navigation
  const mainNavigationComponent = new SiteMenuView();
  render(siteMainElement, mainNavigationComponent);

  // filters in main navigation
  const filterComponent = new FilterView(filters);
  render(mainNavigationComponent, filterComponent, PositionsToInsertElement.AFTERBEGIN);
};

renderHeader();
renderNavigation();

const movieListPresenter = new MovieListPresenter(siteMainElement, filmsModel);
// movieListPresenter.init(films, filmsTopRated, filmsMostCommented);
movieListPresenter.init();

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
const filmsStatisticsComponent = new FilmsStatisticsView(films);
render(siteFooterStatisticsElement, filmsStatisticsComponent);

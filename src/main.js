import FilmsModel from './model/films.js';
import Api from './model/api.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterPresenter from './presenter/filter.js';
import {UpdateType, API_AUTHORIZATION, API_END_POINT} from './util/const.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteFooterElement = document.querySelector('.footer').querySelector('.footer__statistics');

const api = new Api(API_END_POINT, API_AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel(api);
commentsModel.setComments();

api.getFilms()
  .then((films) => filmsModel.setFilms(UpdateType.INIT, films))
  .catch(() => filmsModel.setFilms(UpdateType.INIT, []));

const renderNavigation = () => {
  const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
  filterPresenter.init();
};

const movieListPresenter = new MovieListPresenter(siteMainElement, siteHeaderElement, siteFooterElement, filmsModel, filterModel, commentsModel, api);
movieListPresenter.init();
renderNavigation();

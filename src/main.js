import {FILM_COUNT_ALL_MOVIES} from './util/const.js';
import {render} from './util/render.js';
import Api from './model/api.js';
import FilmsStatisticsView from './view/films-statistics.js';
import {generateFilm} from './mock/film.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterPresenter from './presenter/filter.js';
import {getComments} from './mock/comment.js';
import {UpdateType} from "./util/const";


// films list
// const films = new Array(FILM_COUNT_ALL_MOVIES).fill().map(generateFilm);
// console.log(films);
const comments = getComments();
// const filmsTopRated = getSortFilms(films, sortFilmsByRating);
// const filmsMostCommented = getSortFilms(films, sortFilmsByCommetns);

const AUTHORIZATION = 'Basic l3W285S60S6PWC0ah7hPjj9CEB7';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);

// api.getFilms().then((films) => {
//   console.log(films);
//   // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
//   // а ещё на сервере используется snake_case, а у нас camelCase.
//   // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
//   // Есть вариант получше - паттерн "Адаптер"
// });

const filmsModel = new FilmsModel();
// filmsModel.setFilms(films);

const filterModel = new FilterModel();

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');

// const renderHeader = () => {
//   // user profile
//
//   const profileComponent = new ProfileView();
//   render(siteHeaderElement, profileComponent);
// };

const renderNavigation = () => {
  // main navigation
  // const mainNavigationComponent = new SiteMenuView();
  // render(siteMainElement, mainNavigationComponent);


  // const filterPresenter = new FilterPresenter(mainNavigationComponent, filterModel, filmsModel);
  const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

  filterPresenter.init();

};

// renderHeader();
// renderNavigation();

const movieListPresenter = new MovieListPresenter(siteMainElement, siteHeaderElement, filmsModel, filterModel, commentsModel);
// movieListPresenter.init(films, filmsTopRated, filmsMostCommented);
movieListPresenter.init();

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
// const filmsStatisticsComponent = new FilmsStatisticsView(films);
// render(siteFooterStatisticsElement, filmsStatisticsComponent);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    renderNavigation();
    const filmsStatisticsComponent = new FilmsStatisticsView(films);
    render(siteFooterStatisticsElement, filmsStatisticsComponent);

  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    renderNavigation();
    const filmsStatisticsComponent = new FilmsStatisticsView(films);
    render(siteFooterStatisticsElement, filmsStatisticsComponent);
  });

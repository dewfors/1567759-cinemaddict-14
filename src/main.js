import {positionsToInsertElement} from './util/const.js';
import {render} from './util/render.js';
import {getSortFilms, sortFilmsByRating, sortFilmsByCommetns} from './util/film.js';
import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
// import SortView from './view/sort.js';
// import FilmsView from './view/films.js';
// import FilmsListAllMoviesView from './view/films-list-all-movies.js';
// import FilmsListTopRatedView from './view/films-list-top-rated.js';
// import FilmsListMostCommentedView from './view/films-list-most-commented.js';
// import FilmsListNoFilmsView from './view/films-list-no-films.js';
// import FilmCardView from './view/film-card.js';
// import LoadMoreButtonView from './view/more-button.js';
import FilmsStatisticsView from './view/films-statistics.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
// import FilmPopupView from './view/film-popup.js';
import MovieListPresenter from './presenter/MovieList.js';
import {
  FILM_COUNT_ALL_MOVIES
} from './util/const.js';

// films list
const films = new Array(FILM_COUNT_ALL_MOVIES).fill().map(generateFilm);
const filmsTopRated = getSortFilms(films, sortFilmsByRating);
const filmsMostCommented = getSortFilms(films, sortFilmsByCommetns);

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
  render(mainNavigationComponent, filterComponent, positionsToInsertElement.AFTERBEGIN);
};

// const renderFilm = (filmListElement, film) => {
//   const filmComponent = new FilmCardView(film);
//   const filmPopupComponent = new FilmPopupView(film);
//
//   const showFilmPopup = () => {
//     siteBodyElement.appendChild(filmPopupComponent.getElement());
//     siteBodyElement.classList.add(BODY_HIDE_OVERFLOW_CLASS_NAME);
//   };
//
//   const hideFilmPopup = () => {
//     siteBodyElement.removeChild(filmPopupComponent.getElement());
//     siteBodyElement.classList.remove(BODY_HIDE_OVERFLOW_CLASS_NAME);
//   };
//
//   const onEscKeyDown = (evt) => {
//     if (evt.key === keyEscapeFormat.ESCAPE || evt.key === keyEscapeFormat.ESC) {
//       evt.preventDefault();
//       hideFilmPopup();
//       document.removeEventListener('keydown', onEscKeyDown);
//     }
//   };
//
//   const handleShowFilmPopupClick = () => {
//     showFilmPopup();
//     document.addEventListener('keydown', onEscKeyDown);
//   };
//
//   const handleHideFilmPopupClick = () => {
//     hideFilmPopup();
//     document.removeEventListener('keydown', onEscKeyDown);
//   };
//
//   filmComponent.setPosterClickHandler(handleShowFilmPopupClick);
//
//   filmComponent.setTitleClickHandler(handleShowFilmPopupClick);
//
//   filmComponent.setCommentsClickHandler(handleShowFilmPopupClick);
//
//   filmPopupComponent.setCloseClickHandler(handleHideFilmPopupClick);
//
//   render(filmListElement, filmComponent, positionsToInsertElement.BEFOREEND);
// };

// const renderFilms = (films) => {
//   const filmsComponent = new FilmsView();
//   const filmsElement = filmsComponent.getElement();
//   if (films.length === 0) {
//     const filmsListNoFilmsComponent = new FilmsListNoFilmsView();
//
//     render(siteMainElement, filmsComponent);
//     render(filmsElement, filmsListNoFilmsComponent);
//     return;
//   }
//
//   // sort
//   const sortComponent = new SortView();
//   render(siteMainElement, sortComponent);
//
//   // films
//   render(siteMainElement, filmsComponent);
//
//   const filmsListAllMoviesComponent = new FilmsListAllMoviesView();
//   render(filmsElement, filmsListAllMoviesComponent);
//
//   const filmsListTopRatedComponent = new FilmsListTopRatedView();
//   render(filmsElement, filmsListTopRatedComponent);
//
//   const filmsListMostCommentedComponent = new FilmsListMostCommentedView();
//   render(filmsElement, filmsListMostCommentedComponent);
//
//   const filmListAllMoviesElement = filmsElement.querySelector('.films-list--all-movies');
//   const filmListTopRatedElement = filmsElement.querySelector('.films-list--top-rated');
//   const filmListMostCommentedElement = filmsElement.querySelector('.films-list--most-commented');
//
//   // All movies
//   const filmListContainerAllMovies = filmListAllMoviesElement.querySelector('.films-list__container');
//   for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
//     renderFilm(filmListContainerAllMovies, films[i]);
//   }
//   if (films.length > FILM_COUNT_PER_STEP) {
//     let renderedFilmCount = FILM_COUNT_PER_STEP;
//
//     const showMoreButtonComponent = new LoadMoreButtonView();
//     render(filmListAllMoviesElement, showMoreButtonComponent);
//
//     showMoreButtonComponent.setClickHandler(() => {
//       films
//         .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
//         .forEach((film) => renderFilm(filmListContainerAllMovies, film));
//
//       renderedFilmCount += FILM_COUNT_PER_STEP;
//       if (renderedFilmCount >= films.length) {
//         remove(showMoreButtonComponent);
//       }
//
//     });
//   }
//
//   // Top rated
//   const filmListContainerTopRated = filmListTopRatedElement.querySelector('.films-list__container');
//   for (let i = 0; i < FILM_COUNT_TOP_RATED; i++) {
//     // render(filmListContainerTopRated, new FilmCardView(filmsTopRated[i]).getElement());
//     renderFilm(filmListContainerTopRated, filmsTopRated[i]);
//   }
//
//   // Most commented
//   const filmListContainerMostCommented = filmListMostCommentedElement.querySelector('.films-list__container');
//   for (let i = 0; i < FILM_COUNT_MOST_COMMENTED; i++) {
//     renderFilm(filmListContainerMostCommented, filmsMostCommented[i]);
//   }
//
// };

renderHeader();
renderNavigation();

const movieListPresenter = new MovieListPresenter(siteMainElement);
movieListPresenter.init(films, filmsTopRated, filmsMostCommented);
// renderFilms(films);

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
const filmsStatisticsComponent = new FilmsStatisticsView(films);
render(siteFooterStatisticsElement, filmsStatisticsComponent);

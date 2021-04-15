import {positionsToInsertElement, BODY_HIDE_OVERFLOW_CLASS_NAME, keyEscapeFormat} from './util/const.js';
import {getSortFilms, sortFilmsByRating, sortFilmsByCommetns, render} from './util/utils.js';
import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import FilmsListAllMoviesView from './view/films-list-all-movies.js';
import FilmsListTopRatedView from './view/films-list-top-rated.js';
import FilmsListMostCommentedView from './view/films-list-most-commented.js';
import FilmsListNoFilmsView from './view/films-list-no-films.js';
import FilmCardView from './view/film-card.js';
import LoadMoreButtonView from './view/more-button.js';
import FilmsStatisticsView from './view/films-statistics.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import FilmPopupView from './view/film-popup.js';
import {
  FILM_COUNT_ALL_MOVIES,
  FILM_COUNT_PER_STEP,
  FILM_COUNT_TOP_RATED,
  FILM_COUNT_MOST_COMMENTED
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
  render(siteHeaderElement, new ProfileView().getElement());
};

const renderNavigation = () => {
  // main navigation
  const mainNavigationElement = new SiteMenuView().getElement();
  render(siteMainElement, mainNavigationElement);

  // filters in main navigation
  render(mainNavigationElement, new FilterView(filters).getElement(), positionsToInsertElement.AFTERBEGIN);
};

const renderFilm = (filmListElement, task) => {
  const filmComponent = new FilmCardView(task);
  const filmPopupComponent = new FilmPopupView(task);

  const showFilmPopup = () => {
    siteBodyElement.appendChild(filmPopupComponent.getElement());
    siteBodyElement.classList.add(BODY_HIDE_OVERFLOW_CLASS_NAME);
  };

  const hideFilmPopup = () => {
    siteBodyElement.removeChild(filmPopupComponent.getElement());
    siteBodyElement.classList.remove(BODY_HIDE_OVERFLOW_CLASS_NAME);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === keyEscapeFormat.ESCAPE || evt.key === keyEscapeFormat.ESC) {
      evt.preventDefault();
      hideFilmPopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const handleShowFilmPopupClick = () => {
    showFilmPopup();
    document.addEventListener('keydown', onEscKeyDown);
  };

  const handleHideFilmPopupClick = () => {
    hideFilmPopup();
    document.removeEventListener('keydown', onEscKeyDown);
  };

  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', handleShowFilmPopupClick);
  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', handleShowFilmPopupClick);
  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', handleShowFilmPopupClick);
  filmPopupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', handleHideFilmPopupClick);

  render(filmListElement, filmComponent.getElement(), positionsToInsertElement.BEFOREEND);
};

const renderFilms = (films) => {
  const filmsElement = new FilmsView().getElement();
  if (films.length === 0) {
    render(siteMainElement, filmsElement);
    render(filmsElement, new FilmsListNoFilmsView().getElement());
    return;
  }

  // sort
  render(siteMainElement, new SortView().getElement());

  // films
  render(siteMainElement, filmsElement);

  const filmsListAllMoviesElement = new FilmsListAllMoviesView().getElement();
  render(filmsElement, filmsListAllMoviesElement);

  const filmsListTopRatedElement = new FilmsListTopRatedView().getElement();
  render(filmsElement, filmsListTopRatedElement);

  const filmsListMostCommentedElement = new FilmsListMostCommentedView().getElement();
  render(filmsElement, filmsListMostCommentedElement);

  const filmListAllMovies = filmsElement.querySelector('.films-list--all-movies');
  const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
  const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');

  // All movies
  const filmListContainerAllMovies = filmListAllMovies.querySelector('.films-list__container');
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmListContainerAllMovies, films[i]);
  }
  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const showMoreButton = new LoadMoreButtonView().getElement();
    render(filmListAllMovies, showMoreButton);

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmListContainerAllMovies, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;
      if (renderedFilmCount >= films.length) {
        showMoreButton.remove();
      }

    });
  }

  // Top rated
  const filmListContainerTopRated = filmListTopRated.querySelector('.films-list__container');
  for (let i = 0; i < FILM_COUNT_TOP_RATED; i++) {
    // render(filmListContainerTopRated, new FilmCardView(filmsTopRated[i]).getElement());
    renderFilm(filmListContainerTopRated, filmsTopRated[i]);
  }

  // Most commented
  const filmListContainerMostCommented = filmListMostCommented.querySelector('.films-list__container');
  for (let i = 0; i < FILM_COUNT_MOST_COMMENTED; i++) {
    // render(filmListContainerMostCommented, new FilmCardView(filmsMostCommented[i]).getElement());
    renderFilm(filmListContainerMostCommented, filmsMostCommented[i]);
  }

};

renderHeader();
renderNavigation();
renderFilms(films);

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
render(siteFooterStatisticsElement, new FilmsStatisticsView(films).getElement());

import {positionsToInsertElement, BODY_HIDE_OVERFLOW_CLASS_NAME} from './util/const.js';
import {getSortFilms, sortFilmsByRating, sortFilmsByCommetns, render} from './util/utils.js';
import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import FilmCardView from './view/film-card.js';
import LoadMoreButtonView from './view/more-button.js';
import FilmsStatisticsView from './view/films-statistics.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
// import {getComments} from './mock/comment.js';
import FilmPopupView from './view/film-popup.js';
import {
  FILM_COUNT_ALL_MOVIES,
  FILM_COUNT_PER_STEP,
  FILM_COUNT_TOP_RATED,
  FILM_COUNT_MOST_COMMENTED
} from './util/const.js';

const siteBodyElement = document.querySelector('body');

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

  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    showFilmPopup();
  });
  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    showFilmPopup();
  });
  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    showFilmPopup();
  });
  filmPopupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    hideFilmPopup();
  });

  render(filmListElement, filmComponent.getElement(), positionsToInsertElement.BEFOREEND);
};

// films list
const films = new Array(FILM_COUNT_ALL_MOVIES).fill().map(generateFilm);

// filters list
const filters = generateFilter(films);

const filmsTopRated = getSortFilms(films, sortFilmsByRating);
const filmsMostCommented = getSortFilms(films, sortFilmsByCommetns);

// film popup

// renderElement(siteBodyElement, new FilmPopupView(films[0]).getElement());

// user profile
const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, new ProfileView().getElement());

const siteMainElement = document.querySelector('.main');

// main navigation
render(siteMainElement, new SiteMenuView().getElement());

// filters in main navigation
const mainNavigationElement = document.querySelector('.main-navigation');
render(mainNavigationElement, new FilterView(filters).getElement(), positionsToInsertElement.AFTERBEGIN);

// sort
render(siteMainElement, new SortView().getElement());

// films
render(siteMainElement, new FilmsView().getElement());

const filmsElement = siteMainElement.querySelector('.films');
const filmListAllMovies = filmsElement.querySelector('.films-list--all-movies');
const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');

// All movies
const filmListContainerAllMovies = filmListAllMovies.querySelector('.films-list__container');
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  // render(filmListContainerAllMovies, new FilmCardView(films[i]).getElement());
  renderFilm(filmListContainerAllMovies, films[i]);
}
if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(filmListAllMovies, new LoadMoreButtonView().getElement());

  const showMoreButton = filmListAllMovies.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      // .forEach((film) => render(filmListContainerAllMovies, new FilmCardView(film).getElement()));
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

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
render(siteFooterStatisticsElement, new FilmsStatisticsView(films).getElement());

import {positionsToInsertElement} from './util/const.js';
import {getSortFilms, sortFilmsByRating, sortFilmsByCommetns, renderElement} from './util/utils.js';
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


// films list
const films = new Array(FILM_COUNT_ALL_MOVIES).fill().map(generateFilm);

// filters list
const filters = generateFilter(films);

const filmsTopRated = getSortFilms(films, sortFilmsByRating);
const filmsMostCommented = getSortFilms(films, sortFilmsByCommetns);

const siteBodyElement = document.querySelector('body');
renderElement(siteBodyElement, new FilmPopupView(films[0]).getElement());

// user profile
const siteHeaderElement = document.querySelector('.header');
renderElement(siteHeaderElement, new ProfileView().getElement());


const siteMainElement = document.querySelector('.main');

// main navigation
renderElement(siteMainElement, new SiteMenuView().getElement());


// filters in main navigation
const mainNavigationElement = document.querySelector('.main-navigation');
renderElement(mainNavigationElement, new FilterView(filters).getElement(), positionsToInsertElement.AFTERBEGIN);

// sort
renderElement(siteMainElement, new SortView().getElement());

// films
renderElement(siteMainElement, new FilmsView().getElement());

const filmsElement = siteMainElement.querySelector('.films');
const filmListAllMovies = filmsElement.querySelector('.films-list--all-movies');
const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');

// All movies
const filmListContainerAllMovies = filmListAllMovies.querySelector('.films-list__container');
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderElement(filmListContainerAllMovies, new FilmCardView(films[i]).getElement());
}
if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderElement(filmListAllMovies, new LoadMoreButtonView().getElement());

  const showMoreButton = filmListAllMovies.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderElement(filmListContainerAllMovies, new FilmCardView(film).getElement()));

    renderedFilmCount += FILM_COUNT_PER_STEP;
    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }

  });
}

// Top rated
const filmListContainerTopRated = filmListTopRated.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT_TOP_RATED; i++) {
  renderElement(filmListContainerTopRated, new FilmCardView(filmsTopRated[i]).getElement());
}

// Most commented
const filmListContainerMostCommented = filmListMostCommented.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT_MOST_COMMENTED; i++) {
  renderElement(filmListContainerMostCommented, new FilmCardView(filmsMostCommented[i]).getElement());
}

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');
renderElement(siteFooterStatisticsElement, new FilmsStatisticsView(films).getElement());

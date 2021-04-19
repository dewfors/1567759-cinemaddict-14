import {
  FILM_COUNT_PER_STEP,
  FILM_COUNT_TOP_RATED,
  FILM_COUNT_MOST_COMMENTED
} from '../util/const.js';
import {render, remove} from '../util/render.js';
import FilmsView from '../view/films.js';
import SortView from '../view/sort.js';
import FilmsListNoFilmsView from '../view/films-list-no-films.js';
import FilmsListAllMoviesView from '../view/films-list-all-movies.js';
import FilmsListTopRatedView from '../view/films-list-top-rated.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented.js';
// import FilmCardView from '../view/film-card.js';
// import FilmPopupView from '../view/film-popup.js';
// import {BODY_HIDE_OVERFLOW_CLASS_NAME, keyEscapeFormat, positionsToInsertElement} from '../util/const.js';
import LoadMoreButtonView from '../view/more-button.js';
import Movie from './Movie.js';

export default class MovieList {
  constructor(mainContainer) {
    this._filmsContainer = mainContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._FilmsComponent = new FilmsView();
    this._filmsElement = this._FilmsComponent.getElement();
    this._sortComponent = new SortView();
    this._filmsListNoFilmsComponent = new FilmsListNoFilmsView();
    this._loadMoreButtonComponent =new LoadMoreButtonView();
    this._filmsListAllMoviesComponent = new FilmsListAllMoviesView();
    this._filmsListAllMoviesElement = this._filmsListAllMoviesComponent.getElement();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListTopRatedElement = this._filmsListTopRatedComponent.getElement();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();
    this._filmsListMostCommentedElement = this._filmsListMostCommentedComponent.getElement();
    this._loadMoreButtonComponent =new LoadMoreButtonView();

    // this._siteBodyElement = document.querySelector('body');

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(films, filmsTopRated, filmsMostCommented) {
    this._films = films.slice();
    this._filmsTopRated = filmsTopRated.slice();
    this._filmsMostCommented = filmsMostCommented.slice();
    this._renderFilmsBoard();
  }

  _renderFilm(filmListContainer, film) {
    const filmPresenter = new Movie(filmListContainer);
    filmPresenter.init(film);

    // const filmComponent = new FilmCardView(film);
    // const filmPopupComponent = new FilmPopupView(film);
    //
    // const showFilmPopup = () => {
    //   this._siteBodyElement.appendChild(filmPopupComponent.getElement());
    //   this._siteBodyElement.classList.add(BODY_HIDE_OVERFLOW_CLASS_NAME);
    // };
    //
    // const hideFilmPopup = () => {
    //   this._siteBodyElement.removeChild(filmPopupComponent.getElement());
    //   this._siteBodyElement.classList.remove(BODY_HIDE_OVERFLOW_CLASS_NAME);
    // };
    //
    // const onEscKeyDown = (evt) => {
    //   if (evt.key === keyEscapeFormat.ESCAPE || evt.key === keyEscapeFormat.ESC) {
    //     evt.preventDefault();
    //     hideFilmPopup();
    //     document.removeEventListener('keydown', onEscKeyDown);
    //   }
    // };
    //
    // const handleShowFilmPopupClick = () => {
    //   showFilmPopup();
    //   document.addEventListener('keydown', onEscKeyDown);
    // };
    //
    // const handleHideFilmPopupClick = () => {
    //   hideFilmPopup();
    //   document.removeEventListener('keydown', onEscKeyDown);
    // };
    //
    // filmComponent.setPosterClickHandler(handleShowFilmPopupClick);
    //
    // filmComponent.setTitleClickHandler(handleShowFilmPopupClick);
    //
    // filmComponent.setCommentsClickHandler(handleShowFilmPopupClick);
    //
    // filmPopupComponent.setCloseClickHandler(handleHideFilmPopupClick);
    //
    // render(filmListContainer, filmComponent, positionsToInsertElement.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilmsList(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmsListAllMoviesElement, this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmsList(from, to) {
    const filmListContainerAllMovies = this._filmsListAllMoviesElement.querySelector('.films-list__container');
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(filmListContainerAllMovies, film));
  }

  _renderFilmsAllMovies() {
    this._renderFilmsList(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderFilmsTopRated() {
    const filmListContainerTopRated = this._filmsListTopRatedElement.querySelector('.films-list__container');
    this._filmsTopRated
      .slice(0, FILM_COUNT_TOP_RATED)
      .forEach((film) => this._renderFilm(filmListContainerTopRated, film));
  }

  _renderFilmsMostCommented() {
    const filmListContainerMostCommented = this._filmsListMostCommentedElement.querySelector('.films-list__container');
    this._filmsMostCommented
      .slice(0, FILM_COUNT_MOST_COMMENTED)
      .forEach((film) => this._renderFilm(filmListContainerMostCommented, film));
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._FilmsComponent);
    render(this._filmsElement, this._filmsListNoFilmsComponent);
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent);
  }

  _renderFilms() {
    this._renderSort();

    render(this._filmsContainer, this._FilmsComponent);
    render(this._filmsElement, this._filmsListAllMoviesComponent);
    render(this._filmsElement, this._filmsListTopRatedComponent);
    render(this._filmsElement, this._filmsListMostCommentedComponent);

    this._renderFilmsAllMovies();
    this._renderFilmsTopRated();
    this._renderFilmsMostCommented();
    // render(this._filmsElement, filmsListAllMoviesComponent);
  }

  _renderFilmsBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilms();
  }

}

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
import LoadMoreButtonView from '../view/more-button.js';
import Movie from './Movie.js';
import {updateItem} from '../util/common.js';

export default class MovieList {
  constructor(mainContainer) {
    this._filmsContainer = mainContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};

    this._filmsComponent = new FilmsView();
    this._sortComponent = new SortView();
    this._filmsListNoFilmsComponent = new FilmsListNoFilmsView();
    this._loadMoreButtonComponent =new LoadMoreButtonView();
    this._filmsListAllMoviesComponent = new FilmsListAllMoviesView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();
    this._loadMoreButtonComponent =new LoadMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films, filmsTopRated, filmsMostCommented) {
    this._films = films.slice();
    this._filmsTopRated = filmsTopRated.slice();
    this._filmsMostCommented = filmsMostCommented.slice();
    this._renderFilmsBoard();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderFilm(filmListContainer, film) {
    const filmPresenter = new Movie(filmListContainer, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleLoadMoreButtonClick() {
    this._renderFilmsList(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmsListAllMoviesComponent, this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmsList(from, to) {
    const filmListContainerAllMovies = this._filmsListAllMoviesComponent.getElement().querySelector('.films-list__container');
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
    const filmListContainerTopRated = this._filmsListTopRatedComponent.getElement().querySelector('.films-list__container');
    this._filmsTopRated
      .slice(0, FILM_COUNT_TOP_RATED)
      .forEach((film) => this._renderFilm(filmListContainerTopRated, film));
  }

  _renderFilmsMostCommented() {
    const filmListContainerMostCommented = this._filmsListMostCommentedComponent.getElement().querySelector('.films-list__container');
    this._filmsMostCommented
      .slice(0, FILM_COUNT_MOST_COMMENTED)
      .forEach((film) => this._renderFilm(filmListContainerMostCommented, film));
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._filmsComponent);
    render(this._filmsComponent, this._filmsListNoFilmsComponent);
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilms() {
    this._renderSort();

    render(this._filmsContainer, this._filmsComponent);
    render(this._filmsComponent, this._filmsListAllMoviesComponent);
    render(this._filmsComponent, this._filmsListTopRatedComponent);
    render(this._filmsComponent, this._filmsListMostCommentedComponent);

    this._renderFilmsAllMovies();
    this._renderFilmsTopRated();
    this._renderFilmsMostCommented();
  }

  _clearTaskList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
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

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
// import {updateItem} from '../util/common.js';
import {SortType} from '../util/const.js';
import {TypeFilmList} from '../util/const.js';
import {sortFilmsByDate, sortFilmsByRating} from '../util/film.js';

export default class MovieList {
  constructor(mainContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._filmsContainer = mainContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._filmPresenterTopRated = {};
    this._filmPresenterMostCommented = {};
    this._currentSortType = SortType.DEFAULT;

    this._filmsComponent = new FilmsView();
    this._sortComponent = new SortView(this._currentSortType);
    this._filmsListNoFilmsComponent = new FilmsListNoFilmsView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._filmsListAllMoviesComponent = new FilmsListAllMoviesView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  // init(films, filmsTopRated, filmsMostCommented) {
  //   this._films = films.slice();
  //   this._filmsTopRated = filmsTopRated.slice();
  //   this._filmsMostCommented = filmsMostCommented.slice();
  //   this._sourcedFilms = films.slice();
  //   this._renderFilmsBoard();
  // }

  init() {
    this._renderFilmsBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortFilmsByRating);
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortFilmsByDate);
    }

    return this._filmsModel.getFilms();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    // this._films = updateItem(this._films, updatedFilm);
    // this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);

    // Здесь будем вызывать обновление модели
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderFilm(filmListContainer, film, typeFilmList) {
    const filmPresenter = new Movie(filmListContainer, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);

    switch (typeFilmList) {
      case TypeFilmList.TOP_RATED:
        this._filmPresenterTopRated[film.id] = filmPresenter;
        break;
      case TypeFilmList.MOST_COMMENTED:
        this._filmPresenterMostCommented[film.id] = filmPresenter;
        break;
      default:
        this._filmPresenter[film.id] = filmPresenter;
    }
  }

  // _handleLoadMoreButtonClick() {
  //   this._renderFilmsList(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
  //   this._renderedFilmCount += FILM_COUNT_PER_STEP;
  //
  //   if (this._renderedFilmCount >= this._films.length) {
  //     remove(this._loadMoreButtonComponent);
  //   }
  // }
  _handleLoadMoreButtonClick() {

    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilmsList(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmsListAllMoviesComponent, this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  // _renderFilmsList(from, to) {
  //   const filmListContainerAllMovies = this._filmsListAllMoviesComponent.getElement().querySelector('.films-list__container');
  //   this._films
  //     .slice(from, to)
  //     .forEach((film) => this._renderFilm(filmListContainerAllMovies, film, TypeFilmList.ALL_MOVIES));
  // }
  _renderFilmsList(films) {
    const filmListContainerAllMovies = this._filmsListAllMoviesComponent.getElement().querySelector('.films-list__container');
    films.forEach((film) => this._renderFilm(filmListContainerAllMovies, film, TypeFilmList.ALL_MOVIES));
  }

  // _renderFilmsAllMovies() {
  //   this._renderFilmsList(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));
  //
  //   if (this._films.length > FILM_COUNT_PER_STEP) {
  //     this._renderLoadMoreButton();
  //   }
  // }
  _renderFilmsAllMovies() {
    //this._renderFilmsList(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    this._renderFilmsList(films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderFilmsTopRated() {
    const filmListContainerTopRated = this._filmsListTopRatedComponent.getElement().querySelector('.films-list__container');
    this._filmsTopRated
      .slice(0, FILM_COUNT_TOP_RATED)
      .forEach((film) => this._renderFilm(filmListContainerTopRated, film, TypeFilmList.TOP_RATED));
  }

  _renderFilmsMostCommented() {
    const filmListContainerMostCommented = this._filmsListMostCommentedComponent.getElement().querySelector('.films-list__container');
    this._filmsMostCommented
      .slice(0, FILM_COUNT_MOST_COMMENTED)
      .forEach((film) => this._renderFilm(filmListContainerMostCommented, film, TypeFilmList.MOST_COMMENTED));
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._filmsComponent);
    render(this._filmsComponent, this._filmsListNoFilmsComponent);
  }

  // _sortFilms(sortType) {
  //   switch (sortType) {
  //     case SortType.DATE:
  //       this._films.sort(sortFilmsByDate);
  //       break;
  //     case SortType.RATING:
  //       this._films.sort(sortFilmsByRating);
  //       break;
  //     default:
  //       this._films = this._sourcedFilms.slice();
  //   }
  //
  //   this._currentSortType = sortType;
  // }

  _handleSortTypeChange(sortType) {

    // - Если нужная сортировка уже установлена, то ничего не делаем
    if (this._currentSortType === sortType) {
      return;
    }

    // - Сортируем задачи
    // this._sortFilms(sortType);

    this._currentSortType = sortType;

    // - Очищаем список
    this._clearFilmList();

    // - Рендерим список заново
    this._renderFilmsAllMovies();
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

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  // _renderFilmsBoard() {
  //   if (this._films.length === 0) {
  //     this._renderNoFilms();
  //     return;
  //   }
  //   this._renderSort();
  //   this._renderFilms();
  // }
  _renderFilmsBoard() {
    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilms();
  }

}

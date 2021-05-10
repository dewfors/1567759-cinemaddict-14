import {FILM_COUNT_PER_STEP, FILM_COUNT_TOP_RATED, FILM_COUNT_MOST_COMMENTED} from '../util/const.js';
import {render, remove, replace} from '../util/render.js';
import FilmsView from '../view/films.js';
import SortView from '../view/sort.js';
import FilmsListNoFilmsView from '../view/films-list-no-films.js';
import FilmsListAllMoviesView from '../view/films-list-all-movies.js';
import FilmsListTopRatedView from '../view/films-list-top-rated.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented.js';
import LoadMoreButtonView from '../view/more-button.js';
import Movie from './Movie.js';
// import {updateItem} from '../util/common.js';
import {SortType, UpdateType, UserAction} from '../util/const.js';
import {TypeFilmList} from '../util/const.js';
import {sortFilmsByDate, sortFilmsByRating, sortFilmsByCommetns} from '../util/film.js';
// import {sortFilmsByCommetns} from "../util/film";
import {filter} from '../util/filter.js';

export default class MovieList {
  constructor(mainContainer, filmsModel, filterModel, commentsModel) {

    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;

    this._filmsContainer = mainContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._filmPresenterTopRated = {};
    this._filmPresenterMostCommented = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._filmsComponent = new FilmsView();
    this._filmsListNoFilmsComponent = new FilmsListNoFilmsView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._filmsListAllMoviesComponent = new FilmsListAllMoviesView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();

    // this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsBoard();
  }

  _getFilms() {
    // switch (this._currentSortType) {
    //   case SortType.RATING:
    //     return this._filmsModel.getFilms().slice().sort(sortFilmsByRating);
    //   case SortType.DATE:
    //     return this._filmsModel.getFilms().slice().sort(sortFilmsByDate);
    // }
    //
    // return this._filmsModel.getFilms();

    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.RATING:
        // return this._filmsModel.getFilms().slice().sort(sortFilmsByRating);
        return filtredFilms.sort(sortFilmsByRating);
      case SortType.DATE:
        // return this._filmsModel.getFilms().slice().sort(sortFilmsByDate);
        return filtredFilms.sort(sortFilmsByDate);
    }

    // return this._filmsModel.getFilms();
    return filtredFilms;
  }

  _getFilmsTopRated() {
    return this._filmsModel.getFilms().slice().sort(sortFilmsByRating);
  }

  _getFilmsMostCommented() {
    return this._filmsModel.getFilms().slice().sort(sortFilmsByCommetns);
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    // console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    // console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)

        if (this._filmPresenter[data.id]){
          this._filmPresenter[data.id].init(data);
        }

        if (this._filmPresenterTopRated[data.id]){
          this._filmPresenterTopRated[data.id].init(data);
        }

        if (this._filmPresenterMostCommented[data.id]){
          this._filmPresenterMostCommented[data.id].init(data);
        }

        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        // this._clearFilmList();
        // this._renderFilmList();
        this._filmPresenter[data.id].init(data);

        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearFilmList({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmList();
        break;
    }
  }

  _renderFilm(filmListContainer, film, typeFilmList) {
    // const filmPresenter = new Movie(filmListContainer, this._handleFilmChange, this._handleModeChange);
    const filmPresenter = new Movie(filmListContainer, this._filmsModel, this._commentsModel, this._handleViewAction, this._handleModeChange);
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

  _handleLoadMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilmsListPerStep(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    // render(this._filmsListAllMoviesComponent, this._loadMoreButtonComponent);
    // this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);


    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);

    render(this._filmsListAllMoviesComponent, this._loadMoreButtonComponent);
  }

  _handleSortTypeChange(sortType) {
    // - Если нужная сортировка уже установлена, то ничего не делаем
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._rerenderSort();
    this._clearFilmList({resetRenderedFilmCount: true});
    this._renderFilmList();
  }

  _rerenderSort() {
    if (this._sortComponent !== null) {
      const sortComponent = new SortView(this._currentSortType);
      replace(sortComponent, this._sortComponent);
      this._sortComponent = sortComponent;
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    render(this._filmsContainer, this._sortComponent);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

  }

  _renderFilmsListPerStep(films) {
    const filmListContainerAllMovies = this._filmsListAllMoviesComponent.getElement().querySelector('.films-list__container');
    films.forEach((film) => this._renderFilm(filmListContainerAllMovies, film, TypeFilmList.ALL_MOVIES));
  }

  _renderFilmsAllMovies() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    this._renderFilmsListPerStep(films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderFilmsTopRated() {
    const filmListContainerTopRated = this._filmsListTopRatedComponent.getElement().querySelector('.films-list__container');
    this._getFilmsTopRated()
      .slice(0, FILM_COUNT_TOP_RATED)
      .forEach((film) => this._renderFilm(filmListContainerTopRated, film, TypeFilmList.TOP_RATED));
  }

  _renderFilmsMostCommented() {
    const filmListContainerMostCommented = this._filmsListMostCommentedComponent.getElement().querySelector('.films-list__container');
    this._getFilmsMostCommented()
      .slice(0, FILM_COUNT_MOST_COMMENTED)
      .forEach((film) => this._renderFilm(filmListContainerMostCommented, film, TypeFilmList.MOST_COMMENTED));
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._filmsComponent);
    render(this._filmsComponent, this._filmsListNoFilmsComponent);
  }

  _renderFilmsBoard() {
    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    render(this._filmsContainer, this._filmsComponent);
    render(this._filmsComponent, this._filmsListAllMoviesComponent);
    render(this._filmsComponent, this._filmsListTopRatedComponent);
    render(this._filmsComponent, this._filmsListMostCommentedComponent);

    this._renderFilmsAllMovies();
    this._renderFilmsTopRated();
    this._renderFilmsMostCommented();

  }

  _renderFilmList() {
    this._renderFilmsAllMovies();
  }

  _clearFilmList({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._clearFilmAllMovies();

    // remove(this._sortComponent);
    remove(this._filmsListNoFilmsComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }

  }

  _clearFilmAllMovies() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _clearFilmTopRated() {
    Object
      .values(this._filmPresenterTopRated)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenterTopRated = {};
  }

  _clearFilmMostCommented() {
    Object
      .values(this._filmPresenterMostCommented)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenterMostCommented = {};
  }


}

import {FILM_COUNT_PER_STEP, FILM_COUNT_TOP_RATED, FILM_COUNT_MOST_COMMENTED} from '../util/const.js';
import {render, remove, replace} from '../util/render.js';
import FilmsView from '../view/films.js';
import SortView from '../view/sort.js';
import FilmsListNoFilmsView from '../view/films-list-no-films.js';
import FilmsListAllMoviesView from '../view/films-list-all-movies.js';
import FilmsListTopRatedView from '../view/films-list-top-rated.js';
import FilmsListMostCommentedView from '../view/films-list-most-commented.js';
import LoadMoreButtonView from '../view/more-button.js';
import Movie from './movie.js';
import PopupPresenter from './film-popup.js';
import StatisticsPresenter from './statistics.js';
// import {updateItem} from '../util/common.js';
import {SortType, UpdateType} from '../util/const.js';
import {TypeFilmList} from '../util/const.js';
import {sortFilmsByDate, sortFilmsByRating, sortFilmsByCommetns} from '../util/film.js';
// import {sortFilmsByCommetns} from "../util/film";
import {filter} from '../util/filter.js';
import ProfileView from '../view/profile.js';
import {FilterType} from '../util/const.js';

export default class MovieList {
  constructor(mainContainer, headerContainer, filmsModel, filterModel, commentsModel) {

    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;

    this._filmsContainer = mainContainer;
    this._headerContainer = headerContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._filmPresenterTopRated = {};
    this._filmPresenterMostCommented = {};
    this._popupPresenter = null;
    this._statisticsPresenter = null;
    this._currentSortType = SortType.DEFAULT;

    this._profileComponent = null;
    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._filmsComponent = new FilmsView();
    this._filmsListNoFilmsComponent = new FilmsListNoFilmsView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._filmsListAllMoviesComponent = new FilmsListAllMoviesView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();

    this._handleFilmsList = this._handleFilmsList.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._resetPopupPresenter = this._resetPopupPresenter.bind(this);
    this._handleCommentsModelEvent = this._handleCommentsModelEvent.bind(this);

    // this._filmsModel.addObserver(this._handleModelEvent);
    // this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsBoard();
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

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

    if (filterType === null) {
      return [];
    }

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
    this._filmsModel.updateFilm(updateType, update);
  }

  _handleModelEvent(updateType, data, statisticsFlag) {
    if (statisticsFlag) {
      this._clearFilmsBoard();
      this._renderStatistics();
      return;
    }


    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._filmPresenter[data.id].init(data);
        this._clearFilmMostCommented();
        this._renderFilmsMostCommented();
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)


        // this._clearInvisibleMovies();
        // this._renderFilmList();
        //
        // this._clearFilmMostCommented();
        // this._renderFilmsMostCommented();
        // this._initPopup();

        this._clearFilmsBoard();
        this._renderFilmsBoard(data);

        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)

        // this._clearFilmList({resetRenderedFilmCount: true, resetSortType: true});
        this._clearFilmsBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmsBoard(data);


        // this._rerenderSort();
        // this._renderFilmList();
        // this._resetPopupPresenter();
        break;
    }
  }

  _getRenderedPresenter(filmId, type) {
    switch (type) {
      case TypeFilmList.TOP_RATED:
        return this._filmPresenterTopRated[filmId];
      case TypeFilmList.MOST_COMMENTED:
        return this._filmPresenterMostCommented[filmId];
      default:
        return this._filmPresenter[filmId];
    }
  }

  _setRenderedPresenter(filmId, type, presenter) {
    switch (type) {
      case TypeFilmList.TOP_RATED:
        return this._filmPresenterTopRated[filmId] = presenter;
      case TypeFilmList.MOST_COMMENTED:
        return this._filmPresenterMostCommented[filmId] = presenter;
      default:
        return this._filmPresenter[filmId] = presenter;
    }
  }

  _renderFilm(filmListContainer, film, typeFilmList) {

    let renderedPresenter = this._getRenderedPresenter(film.id, typeFilmList);

    if (!renderedPresenter) {
      renderedPresenter = new Movie(filmListContainer, this._filmsModel, this._commentsModel, this._handleViewAction, this._handleModeChange);
      renderedPresenter.init(film);
      this._setRenderedPresenter(film.id, typeFilmList, renderedPresenter);
    } else {
      renderedPresenter.init(film);
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

    // this._rerenderSort();
    // this._clearFilmList({resetRenderedFilmCount: true});
    // this._renderFilmList();

    this._clearFilmsBoard({resetRenderedFilmCount: true});
    this._renderFilmsBoard();

  }

  _rerenderSort() {
    if (this._sortComponent !== null) {
      const sortComponent = new SortView(this._currentSortType);
      replace(sortComponent, this._sortComponent);
      this._sortComponent = sortComponent;
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
  }

  _renderProfile() {
    // user profile
    const films = this._filmsModel.getFilms().slice();
    const viewedFilms = filter[FilterType.HISTORY](films);

    this._profileComponent = new ProfileView(viewedFilms);
    render(this._headerContainer, this._profileComponent);
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

  _renderFilmsAllMovies(films) {
    const filmCount = films.length;
    const disaplayFilms = films.slice(0, Math.min(filmCount, this._renderedFilmCount));

    this._renderFilmsListPerStep(disaplayFilms);

    if (filmCount > this._renderedFilmCount) {
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

  _renderFilmsBoard(update = null) {
    if (this._statisticsPresenter) {
      this._statisticsPresenter.destroy();
      this._statisticsPresenter = null;
    }

    const films = this._getFilms();

    // if (this._getFilms().length > 0) {
    if (films.length > 0) {
      this._renderSort();
      this._renderProfile();
      this._renderFilmsContainer();
      this._renderFilmsListsContainer();
      // this._renderFilms(this._getFilms());
      this._renderFilms(films);
    } else {
      this._renderFilmsContainer();
      this._renderNoFilms();
    }

    if (this._popupPresenter !== null) {
      this._initPopup(update);
    }


  }

  _renderFilmsContainer() {
    render(this._filmsContainer, this._filmsComponent);
  }

  _renderFilmsListsContainer() {
    render(this._filmsComponent, this._filmsListAllMoviesComponent);
    render(this._filmsComponent, this._filmsListTopRatedComponent);
    render(this._filmsComponent, this._filmsListMostCommentedComponent);

    this._filmsListAllMoviesComponent.setFilmCardClickHandler(this._handleFilmsList);
    this._filmsListTopRatedComponent.setFilmCardClickHandler(this._handleFilmsList);
    this._filmsListMostCommentedComponent.setFilmCardClickHandler(this._handleFilmsList);
  }

  _renderFilms(films) {
    this._renderFilmsAllMovies(films);
    this._renderFilmsTopRated();
    this._renderFilmsMostCommented();

  }

  _renderFilmsBoard1() {
    const films = this._getFilms();
    if (films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    render(this._filmsContainer, this._filmsComponent);
    render(this._filmsComponent, this._filmsListAllMoviesComponent);
    render(this._filmsComponent, this._filmsListTopRatedComponent);
    render(this._filmsComponent, this._filmsListMostCommentedComponent);

    this._filmsListAllMoviesComponent.setFilmCardClickHandler(this._handleFilmsList);
    this._filmsListTopRatedComponent.setFilmCardClickHandler(this._handleFilmsList);
    this._filmsListMostCommentedComponent.setFilmCardClickHandler(this._handleFilmsList);

    this._renderFilmsAllMovies(films);
    this._renderFilmsTopRated();
    this._renderFilmsMostCommented();

  }

  _renderFilmList() {
    this._renderFilmsAllMovies(this._getFilms());
  }

  _clearFilmList({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._clearFilmAllMovies();

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

  _clearInvisibleMovies() {
    const films = this._getFilms();
    const filmCount = films.length;

    Object
      .entries(this._filmPresenter)
      .forEach(([key, presenter]) => {

        const isVisible = films.some((film) => presenter.isThisFilm(film.id));

        if (!isVisible) {
          presenter.destroy();
          delete this._filmPresenter[key];
        }
      });

    // Object
    //   .values(this._filmPresenter)
    //   .forEach((presenter) => presenter.destroy());
    // this._filmPresenter = {};


    this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    remove(this._loadMoreButtonComponent);
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

  _clearFilmPresenters() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    Object
      .values(this._filmPresenterTopRated)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenterTopRated = {};

    Object
      .values(this._filmPresenterMostCommented)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenterMostCommented = {};

  }

  _clearFilmsBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;
    this._clearFilmPresenters();
    remove(this._sortComponent);
    remove(this._profileComponent);

    remove(this._loadMoreButtonComponent);
    remove(this._filmsListTopRatedComponent);
    remove(this._filmsListMostCommentedComponent);
    remove(this._filmsComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmsCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }

  }


  // обработчик кликов по карточкам фильмов для открытия попапа
  _handleFilmsList(evt) {
    const target = evt.target;

    // console.log(target.closest('.film-card').dataset.filmId);

    // клики по постеру заголовку или сомментариям
    const isCorrectClick = target.classList.contains('film-card__title')
      || target.classList.contains('film-card__poster')
      || target.classList.contains('film-card__comments');

    if (!isCorrectClick) {
      return;
    }

    const filmId = target.closest('.film-card').dataset.filmId;
    const film = this._getFilms().find((filmItem) => filmId === filmItem.id);
    this._renderPopup(this._filmsContainer, film, this._resetPopupPresenter);

  }

  _resetPopupPresenter() {
    if (!this._popupPresenter) {
      return;
    }

    this._popupPresenter = null;
    // this._filmsSectionComponent.setFilmCardClickHandler(this._handleFilmsList);
    this._commentsModel.removeObserver(this._handleCommentsModelEvent);
  }

  _renderStatistics() {
    this._statisticsPresenter = new StatisticsPresenter(this._filmsContainer, this._filmsModel);
    this._statisticsPresenter.init();
  }


  _renderPopup(container, film, callback) {
    this._popupPresenter = new PopupPresenter(container, this._commentsModel, this._handleViewAction, callback);
    this._popupPresenter.init(film);
    // this._filmsSectionComponent.removeFilmCardClickHandler();
    this._commentsModel.addObserver(this._handleCommentsModelEvent);
  }

  _initPopup() {
    if (this._popupPresenter !== null) {

      const filmId = this._popupPresenter.getFilm().id;
      const film = this._filmsModel.getFilms().find((filmItem) => filmId === filmItem.id);

      this._popupPresenter.init(film);
    }
  }

  // обработчик изменения модели комментариев
  _handleCommentsModelEvent(updateType, updatedFilm) {

    this._initPopup();
    this._handleModelEvent(UpdateType.PATCH, updatedFilm);

  }

}
import FilmCardView from '../view/film-card.js';
import AbstractPresenter from './abstract-presenter.js';
import FilmPopupView from '../view/film-popup.js';
import {
  BODY_HIDE_OVERFLOW_CLASS_NAME,
  KeyEscapeFormat,
  PositionsToInsertElement,
  Mode,
  UserAction,
  UpdateType
} from '../util/const.js';
import {render, replace, remove} from '../util/render.js';


export default class Movie extends AbstractPresenter {
  constructor(movieListContainer, filmsModel, commentsModel, changeData, changeMode) {
    super();
    this._movieListContainer = movieListContainer;
    // this._filmsModel = filmsModel;
    // console.log(this._filmsModel);
    // this._commentsModel = commentsModel;
    this._changeData = changeData;
    this._handleControlButtons = this._handleControlButtons.bind(this);
    // this._changeMode = changeMode;

    this._filmComponent = null;
    // this._filmPopupComponent = null;
    // this._filmPopupComponent = new FilmPopupView(this._film);
    // this._mode = Mode.DEFAULT;

    // this._handleShowFilmPopupClick = this._handleShowFilmPopupClick.bind(this);
    // this._handleHideFilmPopupClick = this._handleHideFilmPopupClick.bind(this);
    // this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    // this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    // this._handleWatchedClick = this._handleWatchedClick.bind(this);
    // this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    // this._handleAddComment = this._handleAddComment.bind(this);
    // this._handleDeleteComment = this._handleDeleteComment.bind(this);

    // this._handleAddCommentsModelEvent = this._handleAddCommentsModelEvent.bind(this);
    // this._handleDeleteCommentsModelEvent = this._handleDeleteCommentsModelEvent.bind(this);

    // this._siteBodyElement = document.querySelector('body');
  }

  isThisFilm(filmId) {
    return this._film && this._film.id === filmId;
  }

  init(film) {
    this._film = film;

    const prevfilmComponent = this._filmComponent;

    // const prevfilmPopupComponent = this._filmPopupComponent;


    this._filmComponent = new FilmCardView(this._film);
    this._filmComponent.setControlButtonsClick(this._handleControlButtons);
    // this._filmPopupComponent = new FilmPopupView(this._film);

    // this._filmComponent.setPosterClickHandler(this._handleShowFilmPopupClick);
    // this._filmComponent.setTitleClickHandler(this._handleShowFilmPopupClick);
    // this._filmComponent.setCommentsClickHandler(this._handleShowFilmPopupClick);
    // this._filmPopupComponent.setCloseClickHandler(this._handleHideFilmPopupClick);
    //
    // this._filmComponent.setAddWatchlistClickHandler(this._handleWatchlistClick);
    // this._filmComponent.setAddWatchedClickHandler(this._handleWatchedClick);
    // this._filmComponent.setAddFavoriteClickHandler(this._handleFavoriteClick);
    //
    // this._filmPopupComponent.setAddWatchlistClickHandler(this._handleWatchlistClick);
    // this._filmPopupComponent.setAddWatchedClickHandler(this._handleWatchedClick);
    // this._filmPopupComponent.setAddFavoriteClickHandler(this._handleFavoriteClick);
    //
    // this._filmPopupComponent.setAddCommentHandler(this._handleAddComment);
    // this._filmPopupComponent.setDeleteCommentHandler(this._handleDeleteComment);

    // if (prevfilmComponent === null || prevfilmPopupComponent === null) {
    if (prevfilmComponent === null) {
      render(this._movieListContainer, this._filmComponent, PositionsToInsertElement.BEFOREEND);
      return;
    }

    // if (this._mode === mode.DEFAULT){
    //   replace(this._filmComponent, prevfilmComponent);
    // }
    replace(this._filmComponent, prevfilmComponent);

    // if (this._mode === Mode.POPUP) {
    //   const scrollTop = prevfilmPopupComponent.getElement().scrollTop;
    //   replace(this._filmPopupComponent, prevfilmPopupComponent);
    //   this._filmPopupComponent.getElement().scrollTop = scrollTop;
    // }

    remove(prevfilmComponent);
    // remove(prevfilmPopupComponent);

  }

  destroy() {
    remove(this._filmComponent);
    // if (this._mode === Mode.POPUP) {
    //   this._hideFilmPopup();
    // } else {
    //   remove(this._filmPopupComponent);
    // }
  }

  // resetView() {
  //   if (this._mode !== Mode.DEFAULT) {
  //     // this._filmComponent.reset(this._film);
  //     this._handleHideFilmPopupClick();
  //   }
  // }

  // _showFilmPopup() {
  //   this._siteBodyElement.appendChild(this._filmPopupComponent.getElement());
  //   this._siteBodyElement.classList.add(BODY_HIDE_OVERFLOW_CLASS_NAME);
  //   this._commentsModel.addObserver(this._handleAddCommentsModelEvent);
  //   this._commentsModel.addObserver(this._handleDeleteCommentsModelEvent);
  // }

  // _hideFilmPopup() {
  //   this._siteBodyElement.removeChild(this._filmPopupComponent.getElement());
  //   this._siteBodyElement.classList.remove(BODY_HIDE_OVERFLOW_CLASS_NAME);
  //   this._commentsModel.removeObserver(this._handleAddCommentsModelEvent);
  //   this._commentsModel.removeObserver(this._handleDeleteCommentsModelEvent);
  // }

  // _handleEscKeyDown(evt) {
  //   if (evt.key === KeyEscapeFormat.ESCAPE || evt.key === KeyEscapeFormat.ESC) {
  //     evt.preventDefault();
  //     this._filmPopupComponent.reset(this._film);
  //     this._mode = Mode.DEFAULT;
  //     this._hideFilmPopup();
  //     document.removeEventListener('keydown', this._handleEscKeyDown);
  //   }
  // }

  // _handleShowFilmPopupClick() {
  //   this._changeMode();
  //   this._mode = Mode.POPUP;
  //
  //   this._showFilmPopup();
  //   document.addEventListener('keydown', this._handleEscKeyDown);
  // }

  // _handleHideFilmPopupClick() {
  //   this._mode = Mode.DEFAULT;
  //   this._hideFilmPopup();
  //   document.removeEventListener('keydown', this._handleEscKeyDown);
  // }

  // _handleWatchlistClick() {
  //   this._changeData(
  //     UserAction.UPDATE_FILM,
  //     // UpdateType.MINOR,
  //     UpdateType.MINOR,
  //     Object.assign(
  //       {},
  //       this._film,
  //       {
  //         isFilmForWatch: !this._film.isFilmForWatch,
  //       },
  //     ),
  //   );
  // }

  // _handleWatchedClick() {
  //   this._changeData(
  //     UserAction.UPDATE_FILM,
  //     // UpdateType.MINOR,
  //     UpdateType.MINOR,
  //     Object.assign(
  //       {},
  //       this._film,
  //       {
  //         isFilmInHistory: !this._film.isFilmInHistory,
  //       },
  //     ),
  //   );
  // }

  // _handleFavoriteClick() {
  //   this._changeData(
  //     UserAction.UPDATE_FILM,
  //     // UpdateType.MINOR,
  //     UpdateType.MINOR,
  //     Object.assign(
  //       {},
  //       this._film,
  //       {
  //         isFilmInFavorites: !this._film.isFilmInFavorites,
  //       },
  //     ),
  //   );
  // }

  // _handleAddComment(data, newComment) {
  //
  //   this._commentsModel.addComment(UpdateType.MINOR, newComment, data);
  //
  //   // console.log(this._film);
  //   // console.log(data);
  //
  //   // const comments = [...data.comments];
  //   //
  //   // this._changeData(
  //   //   Object.assign(
  //   //     {},
  //   //     this._film,
  //   //     {
  //   //       comments: comments,
  //   //     },
  //   //   ),
  //   // );
  // }

  // _handleAddCommentsModelEvent(updateType, updatedFilm) {
  //   // console.log('_handleAddCommentsModelEvent');
  //   this._changeData(
  //     UserAction.UPDATE_FILM,
  //     // UpdateType.MINOR,
  //     UpdateType.PATCH,
  //     Object.assign(
  //       {},
  //       updatedFilm,
  //     ),
  //   );
  //
  // }


  // _handleDeleteComment(commentId, film) {
  //   this._commentsModel.deleteComment(UpdateType.MINOR, commentId, film);
  // }

  // _handleDeleteCommentsModelEvent(updateType, updatedFilm) {
  //   // console.log('_handleDeleteCommentsModelEvent');
  //   this._changeData(
  //     UserAction.UPDATE_FILM,
  //     // UpdateType.MINOR,
  //     UpdateType.PATCH,
  //     Object.assign(
  //       {},
  //       updatedFilm,
  //     ),
  //   );
  //
  // }

}

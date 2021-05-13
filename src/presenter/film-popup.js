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
import comments from "../model/comments";


export default class FilmPopupPresenter extends AbstractPresenter {
  constructor(popupContainer, commentsModel, handleFilmChange, callback) {
    super();
    this._commentsModel = commentsModel;
    this._popupContainer = popupContainer;
    this._filmPopupComponent = null;
    this._scrollTop = 0;
    this._changeData = handleFilmChange;
    this._handleControlButtons = this._handleControlButtons.bind(this);

    this._clearPopup = callback;


    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleClosePopupButton = this._handleClosePopupButton.bind(this);

    this._handleAddComment = this._handleAddComment.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);

    this._siteBodyElement = document.querySelector('body');
  }

  getFilm() {
    return this._film;
  }


  init(film) {
    this._film = film;

    const prevfilmPopupComponent = this._filmPopupComponent;
    this._filmPopupComponent = new FilmPopupView(this._film, this._commentsModel.getComments());

    if (prevfilmPopupComponent !== null) {
      this._scrollTop = prevfilmPopupComponent.getElement().scrollTop;
      remove(prevfilmPopupComponent);
    }

    render(this._popupContainer, this._filmPopupComponent);
    this._filmPopupComponent.getElement().scrollTop = this._scrollTop;

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._handleEscKeyDown);


    this._filmPopupComponent.setCloseButtonClickHandler(this._handleClosePopupButton);
    this._filmPopupComponent.setControlButtonsClick(this._handleControlButtons);
    this._filmPopupComponent.setAddCommentHandler(this._handleAddComment);
    this._filmPopupComponent.setDeleteCommentHandler(this._handleDeleteComment);

  }

  _handleEscKeyDown(evt) {
    if (evt.key === KeyEscapeFormat.ESCAPE || evt.key === KeyEscapeFormat.ESC) {
      evt.preventDefault();
      this._removePopup();
    }
  }

  _removePopup() {
    remove(this._filmPopupComponent);
    this._filmPopupComponent = null;
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._handleEscKeyDown);
    this._clearPopup();
  }

  // обработчик закрытия попапа
  _handleClosePopupButton() {
    this._removePopup();
  }

  _handleAddComment(data, newComment) {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comments: data.comments,
        },
      ),
    );

    this._commentsModel.addComment(UpdateType.MINOR, newComment, data);
  }

  _handleDeleteComment(commentId, film) {

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comments: film.comments,
        },
      ),
    );


    this._commentsModel.deleteComment(UpdateType.MINOR, commentId, film);
  }



  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isFilmForWatch: !this._film.isFilmForWatch,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isFilmInHistory: !this._film.isFilmInHistory,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isFilmInFavorites: !this._film.isFilmInFavorites,
        },
      ),
    );
  }


}

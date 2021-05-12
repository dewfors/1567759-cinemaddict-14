import FilmCardView from '../view/film-card.js';
import FilmPopupView from '../view/film-popup.js';
import {
  BODY_HIDE_OVERFLOW_CLASS_NAME,
  KeyEscapeFormat,
  PositionsToInsertElement,
  Mode,
  UserAction,
  UpdateType
} from '../util/const.js';
import { render, replace, remove } from '../util/render.js';


export default class FilmPopupPresenter {
  constructor(popupContainer, commentsModel, handleFilmChange, callback) {

    this._commentsModel = commentsModel;
    this._popupContainer = popupContainer;
    this._filmPopupComponent = null;
    this._scrollTop = 0;
    this._changeData = handleFilmChange;

    this._clearPopup = callback;

    this._handleShowFilmPopupClick = this._handleShowFilmPopupClick.bind(this);
    this._handleHideFilmPopupClick = this._handleHideFilmPopupClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleAddComment = this._handleAddComment.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);

    this._handleAddCommentsModelEvent = this._handleAddCommentsModelEvent.bind(this);
    this._handleDeleteCommentsModelEvent = this._handleDeleteCommentsModelEvent.bind(this);

    this._siteBodyElement = document.querySelector('body');
  }


  init(film) {
    this._film = film;

    const prevfilmPopupComponent = this._filmPopupComponent;
    this._filmPopupComponent = new FilmPopupView(this._film);

    if (prevfilmPopupComponent !== null) {
      this._scrollTop = prevfilmPopupComponent.getElement().scrollTop;
      remove(prevfilmPopupComponent);
    }

    render(this._popupContainer, this._filmPopupComponent);
    this._filmPopupComponent.getElement().scrollTop = this._scrollTop;

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._handleEscKeyDown);


    this._filmPopupComponent.setCloseClickHandler(this._handleClosePopupButton);

    this._filmPopupComponent.setAddWatchlistClickHandler(this._handleWatchlistClick);
    this._filmPopupComponent.setAddWatchedClickHandler(this._handleWatchedClick);
    this._filmPopupComponent.setAddFavoriteClickHandler(this._handleFavoriteClick);

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

  // обновление модели комментариев
  _handleDeleteCommentButton(commentId, film) {
    this._commentsModel.deleteComment(UpdateType.MINOR, commentId, film);
  }

  _handleCommentFormSubmit(text, emoji, film) {
    this._commentsModel.createComment(UpdateType.MINOR, text, emoji, film);
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

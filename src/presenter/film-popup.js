import AbstractPresenter from './abstract-presenter.js';
import FilmPopupView from '../view/film-popup.js';
import {KeyCodes, UserAction, UpdateType, BODY_HIDE_OVERFLOW_CLASS_NAME} from '../util/const.js';
import {render, remove} from '../util/render.js';

export default class FilmPopupPresenter extends AbstractPresenter {
  constructor(popupContainer, handleFilmChange, comments, handlePopupClose) {
    super();
    this._popupContainer = popupContainer;
    this._filmPopupComponent = null;
    this._scrollTop = 0;
    this._state = {};
    this._changeData = handleFilmChange;
    this._handleControlButtons = this._handleControlButtons.bind(this);

    this._clearPopup = handlePopupClose;
    this._comments = comments;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleClosePopupButton = this._handleClosePopupButton.bind(this);

    this._handleAddComment = this._handleAddComment.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
  }

  getFilm() {
    return this._film;
  }

  init(film, comments, state) {
    this._film = film;
    this._state = state;
    this._comments = comments;

    this._renderPopup(this._state);
  }

  _renderPopup(state) {
    const prevfilmPopupComponent = this._filmPopupComponent;
    this._filmPopupComponent = new FilmPopupView(this._film, this._comments, state);

    if (prevfilmPopupComponent !== null) {
      this._scrollTop = prevfilmPopupComponent.getElement().scrollTop;
      remove(prevfilmPopupComponent);
    }

    render(this._popupContainer, this._filmPopupComponent);
    this._filmPopupComponent.getElement().scrollTop = this._scrollTop;

    document.body.classList.add(BODY_HIDE_OVERFLOW_CLASS_NAME);
    document.addEventListener('keydown', this._handleEscKeyDown);

    this._filmPopupComponent.setCloseButtonClickHandler(this._handleClosePopupButton);
    this._filmPopupComponent.setControlButtonsClick(this._handleControlButtons);
    this._filmPopupComponent.setAddCommentHandler(this._handleAddComment);
    this._filmPopupComponent.setDeleteCommentHandler(this._handleDeleteComment);
    this._restoreState();
  }

  _handleEscKeyDown(evt) {
    if (evt.key === KeyCodes.ESCAPE || evt.key === KeyCodes.ESC) {
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

  _handleClosePopupButton() {
    this._removePopup();
  }

  _restoreState() {
    this._filmPopupComponent.updateState({
      commentText: this._state.commentText,
      commentEmotion: this._state.commentEmotion,
    });
  }

  resetStateCommentSave() {
    this._state.commentText = '';
    this._state.commentEmotion = '';

    this._filmPopupComponent.updateState({
      isCommentSave: false,
      commentText: '',
      commentEmotion: '',
    });
  }

  _setStateCommentSave(commentEmotion, commentText) {
    this._filmPopupComponent.updateState({
      isCommentSave: true,
      commentText: commentText,
      commentEmotion: commentEmotion,
    });
  }

  _handleAddComment(data, newComment) {
    const commentText = newComment.comment;
    const commentEmotion = newComment.emotion;
    this._setStateCommentSave(commentEmotion, commentText);

    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comments: data.comments,
        },
      ),
      Object.assign(
        {},
        this._filmPopupComponent._state,
      ),
    );
  }

  _setStateCommentDelete(commentId) {
    this._filmPopupComponent.updateState({
      isCommentDelete: true,
      idCommentDelete: commentId,
    });
  }

  _handleDeleteComment(commentId, film) {
    this._setStateCommentDelete(commentId);

    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comments: film.comments,
        },
      ),
      Object.assign(
        {},
        this._filmPopupComponent._state,
      ),

    );
  }

  shakeCommentElement(idCommentToDelete = null) {
    const resetState = () => {
      this._filmPopupComponent.updateState({
        isCommentSave: false,
        isCommentDelete: false,
        idCommentDelete: null,
      });
    };
    const commentElementClassName = idCommentToDelete
      ? `.film-details__comment[data-id='${idCommentToDelete}']`
      : '.film-details__new-comment';
    this._filmPopupComponent.shakeElement(commentElementClassName, resetState);
  }

  getCurrentComments () {
    return this._comments;
  }
}

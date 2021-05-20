import AbstractPresenter from './abstract-presenter.js';
import FilmPopupView from '../view/film-popup.js';
import {KeyEscapeFormat, UserAction, UpdateType} from '../util/const.js';
import {render, remove} from '../util/render.js';
// import FilmsStatisticsView from "../view/films-statistics";

export default class FilmPopupPresenter extends AbstractPresenter {
  constructor(popupContainer, handleFilmChange, comments, handlePopupClose) {
    super();
    // this._commentsModel = commentsModel;
    this._popupContainer = popupContainer;
    this._filmPopupComponent = null;
    this._scrollTop = 0;
    this._state = {};
    this._changeData = handleFilmChange;
    this._handleControlButtons = this._handleControlButtons.bind(this);

    this._clearPopup = handlePopupClose;

    // this._api = api;
    this._comments = comments;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleClosePopupButton = this._handleClosePopupButton.bind(this);

    this._handleAddComment = this._handleAddComment.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);

    this._siteBodyElement = document.querySelector('body');
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

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._handleEscKeyDown);

    this._filmPopupComponent.setCloseButtonClickHandler(this._handleClosePopupButton);
    this._filmPopupComponent.setControlButtonsClick(this._handleControlButtons);
    this._filmPopupComponent.setAddCommentHandler(this._handleAddComment);
    this._filmPopupComponent.setDeleteCommentHandler(this._handleDeleteComment);
    this._restoreState();
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

  _restoreState() {
    this._filmPopupComponent.updateState({
      // isCommentSave: false,
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
    // this._state.commentText = commentText;
    // this._state.commentEmotion = commentEmotion;

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


    // this._commentsModel.addComment(UpdateType.PATCH, commentText, commentEmotion, data);


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

    //this._commentsModel.deleteComment(UpdateType.MINOR, commentId, film);
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

    const commentElement = this._filmPopupComponent.getElement().querySelector(commentElementClassName);
    // commentElement.style.backgroundColor = 'red';

    this._filmPopupComponent.shake(commentElement, resetState);

  }

}

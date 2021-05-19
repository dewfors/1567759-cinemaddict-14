import AbstractPresenter from './abstract-presenter.js';
import FilmPopupView from '../view/film-popup.js';
import {KeyEscapeFormat, UserAction, UpdateType} from '../util/const.js';
import {render, remove} from '../util/render.js';
// import FilmsStatisticsView from "../view/films-statistics";

export default class FilmPopupPresenter extends AbstractPresenter {
  constructor(popupContainer, commentsModel, handleFilmChange, callback, api) {
    super();
    this._commentsModel = commentsModel;
    this._popupContainer = popupContainer;
    this._filmPopupComponent = null;
    this._scrollTop = 0;
    this._changeData = handleFilmChange;
    this._handleControlButtons = this._handleControlButtons.bind(this);

    this._clearPopup = callback;

    this._api = api;
    this._comments = null;

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

    // if (!this._comments) {
    this._api.getComments(this._film.id)
      .then((comments) => {
        // console.log(comments);
        this._commentsModel.setComments(comments);
        this._comments = this._commentsModel.getComments();
        this._renderPopup();

      })
      .catch((error) => {
        const errorMessage = error.message;
        this._commentsModel.setComments([]);
        this._comments = this._commentsModel.getComments();
        this._renderPopup({isLoadCommentsError: true, errorMessage: errorMessage});
      });
    // } else {
    //   this._renderPopup();
    // }

  }

  _renderPopup(error = {}) {
    const prevfilmPopupComponent = this._filmPopupComponent;

    this._filmPopupComponent = new FilmPopupView(this._film, this._comments, error);

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

    const commentText = newComment.comment;
    const commentEmotion = newComment.emotion;

    this._commentsModel.addComment(UpdateType.PATCH, commentText, commentEmotion, data);

    // this._api.addComment(data);

    // this._changeData(
    //   UserAction.UPDATE_FILM,
    //   UpdateType.PATCH,
    //   Object.assign(
    //     {},
    //     this._film,
    //     {
    //       comments: data.comments,
    //     },
    //   ),
    // );
    //

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

  shakeCommentElement(idCommentToDelete = null) {
    const commentElementClassName = idCommentToDelete
      ? `.film-details__comment[data-id='${idCommentToDelete}']`
      : '.film-details__new-comment';

    const commentElement = this._filmPopupComponent.getElement().querySelector(commentElementClassName);
    commentElement.style.backgroundColor = 'red';

  }

}

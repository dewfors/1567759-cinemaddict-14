import he from 'he';
import SmartView from './smart.js';
import {addNewComment} from '../util/comment.js';
import {formatDate, getTimeDuration} from '../util/common.js';
import {DataFormat, emojiList, KeyCodes, UserAction} from '../util/const.js';
import {deleteCommentButtonClassName, commentContainerClassName} from '../util/const.js';

const getCheckboxCheckedIsActive = (flag) => {
  return flag
    ? 'checked'
    : '';
};

const createFilmPopupTemplate = (film, commentsAll, state) => {

  const {isLoadCommentsError} = state;
  const commentsList = commentsAll;

  const {
    title, alternativeTitle, totalRating, release, runtime,
    genre, description, poster, ageRating, director, writers,
    actors, currentCommentEmoji, currentCommentText,
  } = film;

  let currentEmoji = currentCommentEmoji ? currentCommentEmoji : '';
  let currentText = currentCommentText ? currentCommentText : '';

  const {isCommentSave, isCommentDelete, idCommentDelete, commentText, commentEmotion} = state;

  if (!currentEmoji && commentEmotion) {
    currentEmoji = commentEmotion;
  }

  if (!currentText && commentText) {
    currentText = commentText;
  }

  const filmComments = commentsList;

  const dateRelease = formatDate(release.date, DataFormat.FORMAT_DATE_LONG);
  const countryRelease = release.releaseCountry;

  const hours = getTimeDuration(runtime).hours();
  const minutes = getTimeDuration(runtime).minutes();

  const watchlistChecked = getCheckboxCheckedIsActive(film.isFilmForWatch);
  const watchedChecked = getCheckboxCheckedIsActive(film.isFilmInHistory);
  const favoriteChecked = getCheckboxCheckedIsActive(film.isFilmInFavorites);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${alternativeTitle}</h3>
              <p class="film-details__title-original">${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dateRelease}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${hours}h ${minutes}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${countryRelease}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${genre.map((genreCurrent) => `<span class="film-details__genre">${genreCurrent}</span>`).join('')}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistChecked}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist" data-type="watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedChecked}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched" data-type="history">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteChecked}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite" data-type="favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">
          ${isLoadCommentsError ? 'Comments not loaded. Please, reload page' : `Comments <span class="film-details__comments-count">${commentsList.length}</span>`}
        </h3>

        <ul class="film-details__comments-list">
          ${filmComments.map(({id, author, comment, date, emotion}) => `<li class="film-details__comment" data-id="${id}">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(comment)}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${formatDate(date, DataFormat.FORMAT_DATE_TIME)}</span>
                <button ${isCommentSave || isCommentDelete ? 'disabled' : ''} class="film-details__comment-delete">${isCommentDelete && idCommentDelete === id ? 'Deleting...' : 'Delete'}</button>
              </p>
            </div>
          </li>`).join('')}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${currentEmoji ? `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-smile">` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea ${isCommentSave ? 'disabled' : ''} class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${!currentText ? '' : he.encode(currentText)}</textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiList.map((emojiItem) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiItem}" value="${emojiItem}" ${emojiItem === currentCommentEmoji ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${emojiItem}">
              <img src="./images/emoji/${emojiItem}.png" width="30" height="30" alt="emoji">
            </label>`).join('')}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmPopup extends SmartView {
  constructor(film, comments, state) {
    super();

    this._data = FilmPopup.parseDataToState(film);
    this._comments = comments;
    this._state = state;

    this._controlButtonsClickHandler = this._controlButtonsClickHandler.bind(this);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);

    this._handlerCommentEmojiChange = this._handlerCommentEmojiChange.bind(this);
    this._handlerCommentTextInput = this._handlerCommentTextInput.bind(this);
    this._handlerCommentSend = this._handlerCommentSend.bind(this);
    this._handlerCommentDelete = this._handlerCommentDelete.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._data, this._comments, this._state);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setControlButtonsClick(this._callback.buttonsClick);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  _controlButtonsClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonsClick(evt);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._closeButtonClickHandler);
  }

  setControlButtonsClick(callback) {
    this._callback.buttonsClick = callback;
    this.getElement()
      .querySelector('.film-details__controls')
      .addEventListener('click', this._controlButtonsClickHandler);
  }

  _handlerCommentEmojiChange(evt) {
    evt.preventDefault();
    this.updateData({currentCommentEmoji: evt.target.value});
  }

  _handlerCommentTextInput(evt) {
    evt.preventDefault();
    this.updateData({currentCommentText: evt.target.value}, false);
  }

  _handlerCommentSend(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === KeyCodes.ENTER) {
      if (!this._data.currentCommentEmoji || !this._data.currentCommentText) {
        return;
      }
      const newComment = addNewComment();
      newComment.comment = this._data.currentCommentText;
      newComment.emotion = this._data.currentCommentEmoji;

      this._data = FilmPopup.parseStateToData(this._data, UserAction.ADD_COMMENT, newComment);
      this._callback.addComment(this._data, newComment);
    }
  }

  _handlerCommentDelete(evt) {
    evt.preventDefault();

    const isDeleteCommentButton = evt.target.classList.contains(deleteCommentButtonClassName);
    if (!isDeleteCommentButton) {
      return;
    }

    const commentIdToDelete = evt.target.closest(`.${commentContainerClassName}`).dataset.id;

    this._data = FilmPopup.parseStateToData(this._data, UserAction.DELETE_COMMENT, commentIdToDelete);
    this.updateElement();
    this._callback.deleteComment(commentIdToDelete, this._data);
  }


  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._handlerCommentEmojiChange);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._handlerCommentTextInput);
    this.getElement().addEventListener('keydown', this._handlerCommentSend);
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._handlerCommentDelete);
  }

  setAddCommentHandler(callback) {
    this._callback.addComment = callback;
  }

  setDeleteCommentHandler(callback) {
    this._callback.deleteComment = callback;
  }

  static parseDataToState(filmData) {
    return Object.assign(
      {},
      filmData,
      {
        currentCommentEmoji: 'currentEmoji' in filmData,
        currentCommentText: '',
      },
    );
  }

  static parseStateToData(filmData, action, comment) {
    filmData = Object.assign({}, filmData);

    if (action === UserAction.ADD_COMMENT){
      filmData.comments.push(comment.id);
      delete filmData.currentCommentText;
      delete filmData.currentCommentEmoji;
    }

    if (action === UserAction.DELETE_COMMENT){
      filmData.comments = [...filmData.comments].filter((commentItem) => commentItem !== comment);
    }

    return filmData;
  }
}

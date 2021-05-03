// import AbstractView from './abstract.js';
import SmartView from './smart.js';
import {getComments, addNewComment} from '../mock/comment.js';
import {formatDate, getTimeDuration} from '../util/common.js';
import {dataFormat} from '../util/const.js';

const getCheckboxCheckedIsActive = (flag) => {
  return flag
    ? 'checked'
    : '';
};

const createFilmPopupTemplate = (film) => {

  const commentsList = getComments();

  const {
    title, alternative_title, total_rating, release, runtime,
    genre, description, poster, age_rating, director, writers,
    actors, comments, currentCommentEmoji, currentCommentText,
  } = film;
  // } = data;

  const dateRelease = formatDate(release.date, dataFormat.FORMAT_DATE_LONG);
  const countryRelease = release.release_country;

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
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${age_rating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${alternative_title}</h3>
              <p class="film-details__title-original">${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${total_rating}</p>
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
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedChecked}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteChecked}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${film.comments.map((id) => commentsList[id]).map(({author, comment, date, emotion}) => `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${formatDate(date, dataFormat.FORMAT_DATE_LONG)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`).join('')}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${currentCommentEmoji ? `<img src="images/emoji/${currentCommentEmoji}.png" width="55" height="55" alt="emoji-smile">`: ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${!currentCommentText ? '' : currentCommentText}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmPopup extends SmartView {
  constructor(film) {
    super();
    // this._film = film;

    this._data = FilmPopup.parseDataToState(film);

    this._closeClickHandler = this._closeClickHandler.bind(this);

    this._addWatchlistClickHandler = this._addWatchlistClickHandler.bind(this);
    this._addWatchedClickHandler = this._addWatchedClickHandler.bind(this);
    this._addFavoriteClickHandler = this._addFavoriteClickHandler.bind(this);

    this._handlerCommentEmojiChange = this._handlerCommentEmojiChange.bind(this);
    this._handlerCommentTextInput = this._handlerCommentTextInput.bind(this);
    this._handlerCommentSend = this._handlerCommentSend.bind(this);


    this._setInnerHandlers();

  }

  getTemplate() {
    // return createFilmPopupTemplate(this._film);
    return createFilmPopupTemplate(this._data);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _addWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addWatchlistClick();
  }

  _addWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.addWatchedClick();
  }

  _addFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.addFavoriteClick();
  }

  _handlerCommentEmojiChange(evt) {
    // console.log(evt.target.value);
    // console.log(this.getElement());

    evt.preventDefault();

    const inputElements = this.getElement().querySelectorAll('.film-details__emoji-item');
    inputElements.forEach((element) => {
      element.checked=false;
    });

    const inputTargetElement = this.getElement().querySelector(`.film-details__emoji-item[value="${evt.target.value}"]`);
    inputTargetElement.checked = true;

    this.updateData({currentCommentEmoji: evt.target.value});
  }

  _handlerCommentTextInput(evt) {
    evt.preventDefault();
    this.updateData({currentCommentText: evt.target.value}, false);
  }

  _handlerCommentSend(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === 13) {
      if ( !this._data.currentCommentEmoji || !this._data.currentCommentText){
        return;
      }
      this._data = FilmPopup.parseStateToData(this._data);
      this.updateElement();
      this._callback.addComment(this._data);
    }
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._handlerCommentEmojiChange);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._handlerCommentTextInput);
    this.getElement().addEventListener('keydown', this._handlerCommentSend);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setCloseClickHandler(this._callback.closeClick);
    this.setAddWatchlistClickHandler(this._callback.addWatchlistClick);
    this.setAddWatchedClickHandler(this._callback.addWatchedClick);
    this.setAddFavoriteClickHandler(this._callback.addFavoriteClick);
  }


  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeClickHandler);
  }


  setAddWatchlistClickHandler(callback) {
    this._callback.addWatchlistClick = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._addWatchlistClickHandler);
  }

  setAddWatchedClickHandler(callback) {
    this._callback.addWatchedClick = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._addWatchedClickHandler);
  }

  setAddFavoriteClickHandler(callback) {
    this._callback.addFavoriteClick = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._addFavoriteClickHandler);
  }

  setAddCommentHandler(callback) {
    this._callback.addComment = callback;

  }

  static parseDataToState(filmData) {
    return Object.assign(
      {},
      filmData,
      {
        currentCommentEmoji: 'currentEmoji' in filmData,
        // currentCommentEmoji: false,
        currentCommentText: '',
      },
    );
  }

  static parseStateToData(filmData) {
    filmData = Object.assign({}, filmData);
    const newComment = addNewComment();
    console.log(newComment);
    newComment.comment = filmData.currentCommentText;
    newComment.emotion = filmData.currentCommentEmoji;
    filmData.comments.push(newComment.id);
    delete filmData.currentCommentText;
    delete filmData.currentCommentEmoji;
    return filmData;
  }

}


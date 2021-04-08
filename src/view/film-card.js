import {SHORT_DESCRIPTION_MAX_LENGTH} from '../util/const.js';
import {formatDate, getTimeDuration} from '../util/utils.js';

export const createFilmTemplate = (film) => {

  const {title, total_rating, release, runtime, genre, description, poster} = film;
  const year = formatDate(release.date);

  const hours = getTimeDuration(runtime).hours();
  const minutes = getTimeDuration(runtime).minutes();

  const currentGenre = genre[0];
  const shortDescription = description.length > SHORT_DESCRIPTION_MAX_LENGTH
    ? `${description.slice(0, SHORT_DESCRIPTION_MAX_LENGTH)}...`
    : description;
  const commentsCount = film.comments.length;


  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${total_rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${hours}h ${minutes}m</span>
            <span class="film-card__genre">${currentGenre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${shortDescription}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};
import AbstractView from './abstract.js';
import {getRangUser} from '../util/common.js';

const createProfileTemplate = (viewedFilmsCount) => {
  return `<section class="header__profile profile">
  ${viewedFilmsCount
    ? `<p class="profile__rating">${getRangUser(viewedFilmsCount)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">`
    : ''}
  </section>`;
};

export default class Profile extends AbstractView {

  constructor(films) {
    super();
    this._films = films;
    this._viewedFilmsCount = this._films.length;
  }

  getTemplate() {
    return createProfileTemplate(this._viewedFilmsCount);
  }
}

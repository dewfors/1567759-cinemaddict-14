import {ButtonType, UpdateType, UserAction} from '../util/const.js';

export default class AbstractPresenter {
  constructor() {
    this._changeData = null;
  }

  _handleControlButtons(evt) {
    const buttonType = evt.target.dataset.type;

    if (!buttonType) {
      return;
    }

    switch (buttonType) {
      case ButtonType.WATCHLIST:
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
        break;
      case ButtonType.HISTORY:
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
        break;
      case ButtonType.FAVORITE:
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
        break;
    }
  }
}

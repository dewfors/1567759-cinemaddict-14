import {ButtonType, UpdateType, UserAction} from '../util/const.js';

export default class AbstractPresenter {
  constructor() {
    this._changeData = null;
  }

  _handleControlButtons(evt) {
    const buttonType = evt.target.dataset.type;

    // const changedDetails = {...this._film};

    if (!buttonType) {
      return;
    }

    switch (buttonType) {
      case ButtonType.WATCHLIST:
        //changedDetails.isFilmForWatch = !this._film.isFilmForWatch;

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
        //changedDetails.isFilmInHistory = !this._film.isFilmInHistory;
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
        //changedDetails.isFilmInFavorites = !this._film.isFilmInFavorites;
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

    // и передаем объект с измененными данными фильма
    //this._changeData(UpdateType.MINOR, {...this._film, userDetails: changedDetails});
  }
}

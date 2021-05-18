import Observer from '../util/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {

    // console.log(update.id);

    const index = this._films.findIndex((films) => films.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, film, commentId) {
    const oldComments = [...film.comments];
    const comments = oldComments.filter((comment) => comment !== commentId);

    const updatedFilm = {...film, comments};
    this.updateFilm(updateType, updatedFilm);
  }


  static adaptToClient(film) {
    const adaptedFilm = {
      id: film.id,
      title: film.film_info.title,
      alternativeTitle: film.film_info.alternative_title,
      totalRating: film.film_info.total_rating,
      poster: film.film_info.poster,
      ageRating: film.film_info.age_rating,
      director: film.film_info.director,
      writers: film.film_info.writers,
      actors: film.film_info.actors,
      release: {
        date: new Date(film.film_info.release.date),
        releaseCountry: film.film_info.release.release_country,
      },
      runtime: film.film_info.runtime,
      genre: film.film_info.genre,
      isSeveralGenres: film.film_info.genre > 1,
      description: film.film_info.description,
      comments: film.comments,
      isFilmForWatch: film.user_details.watchlist,
      isFilmInHistory: film.user_details.already_watched,
      isFilmInFavorites: film.user_details.favorite,
      dateViewed: new Date(film.user_details.watching_date),
    };
    return adaptedFilm;
  }

  static adaptToServer(film) {
    return {
      'id': film.id,
      'comments': film.comments,
      'film_info': {
        'title': film.title,
        'alternative_title': film.alternativeTitle,
        'total_rating': film.totalRating,
        'poster': film.poster,
        'age_rating': film.ageRating,
        'director': film.director,
        'writers': film.writers,
        'actors': film.actors,
        'release': {
          'date': film.release.date.toISOString(),
          'release_country': film.release.releaseCountry,
        },
        'runtime': film.runtime,
        'genre': film.genre,
        'description': film.description,
      },
      'user_details': {
        'watchlist': film.isFilmForWatch,
        'already_watched': film.isFilmInHistory,
        'favorite': film.isFilmInFavorites,
        'watching_date': film.dateViewed.toISOString(),
      },
    };
  }


}

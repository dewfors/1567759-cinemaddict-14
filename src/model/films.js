import Observer from '../util/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
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

  // deleteComment(updateType, film, commentIndex) {
  deleteComment(updateType, film, commentId) {
    const oldComments = [...film.comments];

    // console.log(commentId);

    // console.log('before',oldComments);
    const comments = oldComments.filter((comment) => comment !== commentId);

    // console.log(comments);

    const updatedFilm = {...film, comments};

    this.updateFilm(updateType, updatedFilm);
  }


}

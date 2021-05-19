import Observer from '../util/observer.js';
// import {UpdateType} from "../util/const";

export default class Comments extends Observer {
  constructor(api) {
    super();
    this._comments = [];
    this._api = api;
  }

  setComments(comments = []) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, commentText, commentEmotion, film) {

    const id = film.id;

    const data = {
      comment: {
        comment: commentText,
        emotion: commentEmotion,
      },
      // id: Number(film.id),
      id: id,
    };
    this._api.addCommentServer(data)
      .then((updateData) => {
        this._notify(updateType, updateData);
      })
      .catch(() => this._notify(updateType, film, {isErrorToAddComment: true}));


    // this._comments = [newComment, ...this._comments];
    // this._notify(updateType, film, newComment);
  }

  deleteComment(updateType, deletedCommentId, film) {

    this._api.deleteCommentServer(deletedCommentId)
      .then((response) => {
        if (response.ok) {
          this._notify(updateType, film, {isErrorToAddComment: false});
        } else {
          this._notify(updateType, film, {isErrorToAddComment: true, idCommentToDelete: deletedCommentId});
        }
      })
      .catch(() => this._notify(updateType, film, {isErrorToAddComment: true, idCommentToDelete: deletedCommentId}));

    //this._comments = [...this._comments].filter((comment) => comment !== deletedCommentId);
    //this._notify(updateType, film, deletedCommentId);
  }
}

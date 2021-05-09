import Observer from '../util/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, newComment) {
    this._comments = [newComment, ...this._comments];
    this._notify(updateType, newComment);
  }

  deleteComment(updateType, deletedCommentId, film) {
    this._comments = [...this._comments].filter((comment) => comment !== deletedCommentId);
    //const index = this._comments.findIndex((comment) => comment.id === deletedCommentId);

    // this._notify(updateType, film, index);
    this._notify(updateType, film, deletedCommentId);
  }
}

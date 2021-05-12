import Abstract from './abstract.js';

export default class Smart extends Abstract {

  constructor () {
    super();
    this._callback = {};
  }

  updateData (update, isUpdateNow = true) {
    if (!update) {
      return;
    }

    // console.log(update);

    this._data =  Object.assign(
      {},
      this._data,
      update,
    );

    if(!isUpdateNow) {
      return;
    }
    this.updateElement();
  }

  updateElement() {
    // console.log(this._data);
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this._scroll = prevElement.scrollTop;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = this._scroll;

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}

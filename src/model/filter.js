import Observer from '../util/observer.js';
import {FilterType} from '../util/const.js';

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
    this._isStatisticsActive = false;
    this._state = {
      activeFilter: FilterType.ALL,
      isStatisticsActive: false,
    };
  }

  setState(updateType, linkType) {
    if (linkType === FilterType.STATS) {
      this._state.activeFilter = FilterType.NONE;
      this._state.isStatisticsActive = true;
    } else {
      this._state.activeFilter = linkType;
      this._state.isStatisticsActive = false;
    }
    this._notify(updateType, this._state,{isStatisticsActive: this._state.isStatisticsActive} );
  }

  getState() {
    return this._state;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._state.activeFilter;
  }
}

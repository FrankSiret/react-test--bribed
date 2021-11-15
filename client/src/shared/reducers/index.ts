import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import bribed, { BribedState } from '../../entities/bribed/bribed.reducer';

export interface IRootState {
  loadingBar?: any;
  readonly bribed?: BribedState;
}

const rootReducer = combineReducers<IRootState>({
  loadingBar,
  bribed
});

export default rootReducer;

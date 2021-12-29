import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const intResponse = createReducer({},{
    [types.SET_PRINCIPAL](state, action){
      let newState = {};
      newState = action.intResponse;
      return newState;
    }
});
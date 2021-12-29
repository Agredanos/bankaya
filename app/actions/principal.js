import * as types from './types';

function Dispatch_CLEAN(intResponse){
    return (dispatch,getState) => {
        dispatch({
            type: types.SET_PRINCIPAL,
            intResponse
        });
    }
}
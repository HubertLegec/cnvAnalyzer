import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import cnvRows, {CnvRowsStoreState} from "./cnvRows";

export interface RootState {
    cnvRows: CnvRowsStoreState;
}

export default combineReducers<RootState>({
    cnvRows,
    router: routerReducer
});
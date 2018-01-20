import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import cnvRows, {CnvRowsStoreState} from "./cnvRows";
import selection, {SelectionStoreState} from "./selection";

export interface RootState {
    cnvRows: CnvRowsStoreState;
    selection: SelectionStoreState;
}

export default combineReducers<RootState>({
    cnvRows,
    selection,
    router: routerReducer
});
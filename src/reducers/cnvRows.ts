import * as _ from "lodash";


export interface CnvRowsStoreState {
    cnvTracks: string[];
    structureRowsLoaded: boolean;
}

const initialState: CnvRowsStoreState = {
    cnvTracks: [],
    structureRowsLoaded: false
};

export default function (state: CnvRowsStoreState = initialState, action: any) {
    switch (action.type) {
        case "STRUCTURE_ROWS_LOADED":
            return _.assign({}, state, {
               structureRowsLoaded: true
            });
        case "CNV_ROWS_LOADED":
            return _.assign({}, state, {
                cnvTracks: _.chain([...state.cnvTracks, action.track])
                   .uniq()
                   .sort()
                   .value()
            });
        default:
            return state;
    }
}
import * as _ from "lodash";


export interface SelectionStoreState {
    selectedChromosome: string;
    startPosition: number;
    endPosition: number;
    selectedTrack: string;
}

const initialState: SelectionStoreState = {
    selectedChromosome: undefined,
    startPosition: undefined,
    endPosition: undefined,
    selectedTrack: undefined
};

export default function (state: SelectionStoreState = initialState, action: any) {
    switch (action.type) {
        case "CHROMOSOME_SELECTED":
            return _.assign({}, state, {
                selectedChromosome: action.chromosome,
                startPosition: undefined,
                endPosition: undefined
            });
        case "TRACK_SELECTED":
            return _.assign({}, state, {
                selectedTrack: action.track,
                startPosition: undefined,
                endPosition: undefined
            });
        case "POSITIONS_CHANGED":
            return _.assign({}, state, {
                startPosition: action.position.min,
                endPosition: action.position.max
            });
        default:
            return state;
    }
}
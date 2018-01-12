import * as _ from "lodash";

export enum CnvType {
    DUPLICATION = "Duplication",
    DELETION = "Deletion"
}

export interface ExonDef {
    start: number;
    end: number;
}

export interface StructureRow {
    bin: number;
    chromosome: string;
    name: string;
    exons: ExonDef[];
}

export interface CnvRow {
    bin: number;
    name: string;
    chromosome: string;
    start: number;
    end: number;
    type: CnvType;
    source: string;
}

export interface CnvRowsStoreState {
    loadedCnvRows: string[];
    structureRowsLoaded: boolean;
}

export interface DataContainer {
    structureRows: StructureRow[];
    cnvRows: CnvRow[];
}

const initialState: CnvRowsStoreState = {
    loadedCnvRows: [],
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
               loadedCnvRows: [...state.loadedCnvRows, action.loadedType]
            });
        default:
            return state;
    }
}
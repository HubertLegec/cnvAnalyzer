
export enum CnvType {
    DUPLICATION = "Duplication",
    DELETION = "Deletion"
}

export interface StructureRow {
    chromosome: string;
    name: string;
    // TODO
}

export interface CnvRow {
    id: number,
    chromosome: string;
    start: number;
    end: number;
    type: CnvType;
    source: string;
}

export interface CnvRowsStoreState {
    controlRows: CnvRow[];
    caseRows: CnvRow[];
    structureRows: StructureRow[];
}

const initialState: CnvRowsStoreState = {
    controlRows: [{
        id: 1,
        chromosome: "chr1",
        start: 30,
        end: 50,
        type: CnvType.DELETION,
        source: "Case"
    }, {
        id: 2,
        chromosome: "chr1",
        start: 130,
        end: 250,
        type: CnvType.DUPLICATION,
        source: "Case"
    }],
    caseRows: [{
        id: 3,
        chromosome: "chr2",
        start: 30,
        end: 50,
        type: CnvType.DELETION,
        source: "Control"
    }],
    structureRows: []
};

export default function (state: CnvRowsStoreState = initialState, action: any) {
    switch (action.type) {
        default:
            return state;
    }
}
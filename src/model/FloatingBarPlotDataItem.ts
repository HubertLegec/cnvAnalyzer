import {CnvRow, CnvType} from "../utils/CnvFileReader";


export class FloatingBarPlotDataItem {
    private nameVal: string;
    private startPos: number;
    private barLength: number;
    private type: CnvType;

    constructor(cnvRow: CnvRow) {
        this.nameVal = cnvRow.name;
        this.startPos = cnvRow.start;
        this.barLength = cnvRow.end - cnvRow.start;
        this.type = cnvRow.type;
    }

    get name(): string {
        return this.nameVal;
    }

    get start(): number {
        return this.startPos;
    }

    get length(): number {
        return this.barLength;
    }

    get cnvType(): CnvType {
        return this.type;
    }

    get hoverText(): string {
        return `Type: ${this.type === CnvType.DELETION ? 'Deletion' : 'Duplication'}`
            + `<br>Start position: ${this.startPos}<br>End position: ${this.startPos + this.length}`;
    }
}
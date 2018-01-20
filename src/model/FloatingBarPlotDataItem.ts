import {CnvRow} from "../utils/CnvFileReader";


export class FloatingBarPlotDataItem {
    private nameVal: string;
    private startPos: number;
    private barLength: number;

    constructor(cnvRow: CnvRow) {
        this.nameVal = cnvRow.name;
        this.startPos = cnvRow.start;
        this.barLength = cnvRow.end - cnvRow.start;
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

    get hoverText(): string {
        return `Start position: ${this.startPos}\nEnd position: ${this.startPos + this.length}`;
    }
}
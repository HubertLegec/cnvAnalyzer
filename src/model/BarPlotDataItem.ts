
export class BarPlotDataItem {
    private exonStartPos: number;
    private exonEndPos: number;
    private deletionsCount: number;
    private duplicationsCount: number;

    constructor(exonStart: number, exonEnd: number) {
        this.exonStartPos = exonStart;
        this.exonEndPos = exonEnd;
        this.deletionsCount = 0;
        this.duplicationsCount = 0;
    }

    get exonStart(): number {
        return this.exonStartPos;
    }

    get exonEnd(): number {
        return this.exonEndPos;
    }

    get exonCenter(): number {
        return this.exonStartPos + (this.exonEndPos - this.exonStartPos) / 2;
    }

    get deletions(): number {
        return this.deletionsCount;
    }

    get duplications(): number {
        return this.duplicationsCount;
    }

    addDuplication() {
        this.duplicationsCount += 1;
    }

    addDeletion() {
        this.deletionsCount += 1;
    }
}
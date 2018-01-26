import * as _ from "lodash";

export class ExonDeletionsDuplications {
    private exonStartPos: number;
    private exonEndPos: number;
    private deletionsNames: string[];
    private duplicationsNames: string[];

    constructor(exonStart: number, exonEnd: number) {
        this.exonStartPos = exonStart;
        this.exonEndPos = exonEnd;
        this.deletionsNames = [];
        this.duplicationsNames = [];
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
        return _.size(this.deletionsNames);
    }

    get deletionsText(): string {
        if (_.size(this.deletionsNames) > 5) {
            return _(this.deletionsNames)
                .take(5)
                .join("<br>") + "...";
        }
        return _.join(this.deletionsNames, "<br>");
    }

    get duplications(): number {
        return _.size(this.duplicationsNames);
    }

    get duplicationsText(): string {
        if (_.size(this.duplicationsNames) > 5) {
            return _(this.duplicationsNames)
                .take(5)
                .join("<br>") + "..."
        }
        return _.join(this.duplicationsNames, "<br>");
    }

    addDuplication(name: string) {
        this.duplicationsNames.push(name);
    }

    addDeletion(name: string) {
        this.deletionsNames.push(name);
    }
}
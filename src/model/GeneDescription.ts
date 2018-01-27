
export class GeneDescription {
    private startPos: number;
    private endPos: number;
    private geneName: string;

    constructor(name: string, start: number, end: number) {
        this.geneName = name;
        this.startPos = start;
        this.endPos = end;
    }

    get name(): string {
        return this.geneName;
    }

    get start(): number {
        return this.startPos;
    }

    get end(): number {
        return this.endPos;
    }

    get length(): number {
        return this.endPos - this.startPos;
    }

    get hoverText(): string {
        return `Name: ${this.geneName}<br>Start position: ${this.startPos}<br>End position: ${this.endPos}`;
    }
}
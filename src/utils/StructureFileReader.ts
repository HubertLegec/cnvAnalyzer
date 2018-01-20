import * as _ from "lodash";
import {TxtFileReader} from "./TxtFileReader";


export interface ExonDef {
    start: number;
    end: number;
    chromosome: string;
}

export interface StructureRow {
    chromosome: string;
    name: string;
    exons: ExonDef[];
}

export class StructureFileReader extends TxtFileReader {

    async getStructureRows(): Promise<StructureRow[]> {
        return this.readFile()
            .then(rows => this.mapRowsToObjects(rows));
    }

    private mapRowsToObjects(rows: string[]): StructureRow[] {
        return _.chain(rows)
            .map(_.trim)
            .filter(r => !_.isEmpty(r))
            .map(r => this.mapFileRowToObject(r))
            .value();
    }

    private mapFileRowToObject(row: string): StructureRow {
        const splitRow = _.split(row, "\t");
        return {
            chromosome: splitRow[2],
            name: splitRow[1],
            exons: this.mapToExons(splitRow[9], splitRow[10], splitRow[2])
        }
    }

    private mapToExons(startsStr: string, endsStr: string, chromosome: string): ExonDef[] {
        const starts = _.split(_.trimEnd(startsStr, ","), ",");
        const ends = _.split(_.trimEnd(endsStr, ","), ",");
        return _.zipWith(starts, ends, (s, e) => ({
            start: _.toInteger(s),
            end: _.toInteger(e),
            chromosome
        } as ExonDef));
    }
}
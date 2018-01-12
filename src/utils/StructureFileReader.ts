import * as _ from "lodash";
import {TxtFileReader} from "./TxtFileReader";
import {ExonDef, StructureRow} from "../reducers/cnvRows";

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
            bin: _.toInteger(splitRow[0]),
            chromosome: splitRow[2],
            name: splitRow[1],
            exons: this.mapToExons(splitRow[9], splitRow[10])
        }
    }

    private mapToExons(startsStr: string, endsStr: string): ExonDef[] {
        const starts = _.split(startsStr, ",");
        const ends = _.split(endsStr, ",");
        return _.zipWith(starts, ends, (s, e) => ({
            start: _.toInteger(s),
            end: _.toInteger(e)
        } as ExonDef));
    }
}
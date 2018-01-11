import * as _ from "lodash";
import {TxtFileReader} from "./TxtFileReader";
import {StructureRow} from "../reducers/cnvRows";

export class StructureFileReader extends TxtFileReader {

    async getStructureRows(): Promise<StructureRow[]> {
        return this.readFile()
            .then(rows => this.mapRowsToObjects(rows));
    }

    private mapRowsToObjects(rows: string[]): StructureRow[] {
        return _.chain(rows)
            .map(r => this.mapFileRowToObject(r))
            .value();
    }

    private mapFileRowToObject(row: string): StructureRow {
        // TODO
        return {
            chromosome: "chr1",
            name: "name"
        }
    }
}
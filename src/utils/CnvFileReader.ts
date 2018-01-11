import {TxtFileReader} from "./TxtFileReader";
import * as _ from "lodash";
import {CnvRow, CnvType} from "../reducers/cnvRows";

class CnvFileReader extends TxtFileReader {

    async getCnvRows(): Promise<CnvRow[]> {
        return this.readFile()
            .then(rows => this.mapRowsToObjects(rows));
    }

    private mapRowsToObjects(rows: string[]): CnvRow[] {
        return _.chain(rows)
            .map(r => this.mapFileRowToObject(r))
            .value();
    }

    private mapFileRowToObject(row: string): CnvRow {
        // TODO
        return {
            id: 1,
            chromosome: "chr1",
            start: 100,
            end: 120,
            type: CnvType.DUPLICATION,
            source: "control"
        }
    }
}
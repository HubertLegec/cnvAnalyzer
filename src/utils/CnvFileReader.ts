import {TxtFileReader} from "./TxtFileReader";
import * as _ from "lodash";


export enum CnvType {
    DUPLICATION = "Duplication",
    DELETION = "Deletion"
}

export interface CnvRow {
    name: string;
    chromosome: string;
    start: number;
    end: number;
    type: CnvType;
    source: string;
}

export class CnvFileReader extends TxtFileReader {

    async getCnvRows(): Promise<CnvRow[]> {
        return this.readFile()
            .then(rows => this.mapRowsToObjects(rows));
    }

    private mapRowsToObjects(rows: string[]): CnvRow[] {
        const sourceName = this.getSourceName();
        return _.chain(rows)
            .map(_.trim)
            .filter(r => !_.isEmpty(r))
            .map(r => this.mapFileRowToObject(r, sourceName))
            .value();
    }

    private mapFileRowToObject(row: string, sourceName: string): CnvRow {
        const splitRow = _.split(row, "\t");
        const additionalParams = _.dropRight(_.split(splitRow[11], ","));
        const type_name = _.last(additionalParams);
        return {
            name: splitRow[4],
            chromosome: splitRow[1],
            start: _.toInteger(splitRow[2]),
            end: _.toInteger(splitRow[3]),
            type: this.getTypeByName(type_name),
            source: sourceName
        }
    }

    public getSourceName(): string {
        const filename = _.toLower(this.getFileName());
        if (_.endsWith(filename, "control.txt")) {
            return "Control";
        } else if (_.endsWith(filename, "case.txt")) {
            return "Case";
        }
        return "Unknown";
    }

    private getTypeByName(name: string): CnvType {
        switch (name) {
            case "copy_number_loss":
                return CnvType.DELETION;
            case "copy_number_gain":
                return CnvType.DUPLICATION;
            default:
                throw new Error("Unknown type name: " + name);
        }
    }
}
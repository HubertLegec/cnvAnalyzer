import {ExonDef, StructureRow} from "../utils/StructureFileReader";
import {CnvRow, CnvType} from "../utils/CnvFileReader";
import {ExonDeletionsDuplications} from "./ExonDeletionsDuplications";
import * as _ from "lodash";

export class DataContainer {
    private structureRowsData: {[key: string]: StructureRow[]};
    private cnvRowsData: {[key: string]: CnvRow[]} = {};
    private availableChromosomes: string[] = [];

    get cnvRows(): CnvRow[] {
        return _.chain(this.cnvRowsData)
            .values()
            .flatten()
            .value();
    }

    get chromosomes(): string[] {
        return this.availableChromosomes;
    }

    getCnvsRange(track: string, chromosome: string): {min: number, max: number} {
        const rows = this.getCnvsByTrackAndChromosome(track, chromosome);
        return this.getCnvsRangeForRows(rows);
    }

    getCnvsRangeForRows(rows: CnvRow[]): {min: number, max: number} {
        const min = _(rows)
            .map(r => r.start)
            .min();
        const max = _(rows)
            .map(r => r.end)
            .max();
        return {min: _.defaultTo(min, 0), max: _.defaultTo(max, 0)};
    }

    getDeletionsDuplications(track: string, chromosome: string, minPos: number, maxPos: number): ExonDeletionsDuplications[] {
        const cnvs = this.getCnvsByTrackAndChromosome(track, chromosome);
        return this.calculateDeletionsAndDuplications(cnvs, chromosome, minPos, maxPos);
    }

    public setStructureRows(structureRows: StructureRow[]) {
        this.structureRowsData = _.groupBy(structureRows, r => r.chromosome);
    }

    public addCnvRows(cnvRows: CnvRow[], track: string) {
        this.cnvRowsData[track] = cnvRows;
        this.reloadAvailableChromosomes();
    }

    private reloadAvailableChromosomes() {
        const structChromosomes = _.keys(this.structureRowsData);
        const cnvChromosomes = _.chain(this.cnvRowsData)
            .values()
            .flatten()
            .map(r => r.chromosome)
            .uniq()
            .value();
        this.availableChromosomes = _.intersection(structChromosomes, cnvChromosomes).sort();
    }

    private getStructureRows(chromosome: string): StructureRow[] {
        return _.get(this.structureRowsData, [chromosome], []);
    }

    private getCnvRows(track: string): CnvRow[] {
        return _.get(this.cnvRowsData, [track], []);
    }

    private getCnvsByTrackAndChromosome(track: string, chromosome: string): CnvRow[] {
        return _.chain(this.getCnvRows(track))
            .filter(r => r.chromosome === chromosome)
            .value();
    }

    private calculateDeletionsAndDuplications(cnvRows: CnvRow[], chromosome: string, minPos: number, maxPos: number): ExonDeletionsDuplications[] {
        return _.chain(this.getStructureRows(chromosome))
            .map(r => r.exons)
            .flatten()
            .filter(e => e.start <= maxPos && e.end >= minPos)
            .map(e => this.calculateDeletionsAndDuplicationsForExon(e, cnvRows))
            .value();
    }

    private calculateDeletionsAndDuplicationsForExon(exon: ExonDef, cnvRows: CnvRow[]): ExonDeletionsDuplications {
        const result = new ExonDeletionsDuplications(exon.start, exon.end);
        _(cnvRows)
            .filter(r => r.start <= exon.end && r.end >= exon.start)
            .forEach(r =>
                r.type === CnvType.DUPLICATION ? result.addDuplication() : result.addDeletion()
            );
        return result;
    }
}
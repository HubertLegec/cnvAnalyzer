import {ExonDef, StructureRow} from "../utils/StructureFileReader";
import {CnvRow, CnvType} from "../utils/CnvFileReader";
import {ExonDeletionsDuplications} from "./ExonDeletionsDuplications";
import * as _ from "lodash";
import {GeneDescription} from "./GeneDescription";

export class DataContainer {
    private structureRowsData: { [key: string]: StructureRow[] };
    private cnvRowsData: { [key: string]: CnvRow[] } = {};
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

    getCnvsRange(track: string, chromosome: string): { min: number, max: number } {
        const rows = this.getCnvsByTrackAndChromosome(track, chromosome);
        return DataContainer.getCnvsRangeForRows(rows);
    }

    getGenes(chromosome: string, minPos: number, maxPos: number): GeneDescription[] {
        const strRows = this.getStructureRows(chromosome);
        return _.chain(strRows)
            .filter(g => g.start <= maxPos && g.end >= minPos)
            .map(g => new GeneDescription(g.geneName, g.start, g.end))
            .value();
    }

    static getCnvsRangeForRows(rows: CnvRow[]): { min: number, max: number } {
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

    setStructureRows(structureRows: StructureRow[]) {
        this.structureRowsData = _.groupBy(structureRows, r => r.chromosome);
    }

    addCnvRows(cnvRows: CnvRow[], track: string) {
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
        const dnd = _.chain(this.getStructureRows(chromosome))
            .map(r => r.exons)
            .flatten()
            .uniqBy(e => e.start + "-" + e.end)
            .filter(e => e.start <= maxPos && e.end >= minPos)
            .map(e => this.calculateDeletionsAndDuplicationsForExon(e, cnvRows))
            .value();
        return _.chain(dnd)
            .filter(e => DataContainer.barNoOverlap(e, dnd))
            .value();
    }

    static barNoOverlap(exon: ExonDeletionsDuplications, otherExons: ExonDeletionsDuplications[]) {
        return !_.some(otherExons,e =>
            //bar inside another
            (exon.exonStart >= e.exonStart && exon.exonEnd < e.exonEnd) ||
            (exon.exonStart > e.exonStart && exon.exonEnd <= e.exonEnd) ||
            //smaller bar overlaping bigger one from the left
            (exon.exonEnd >= e.exonStart && exon.exonStart < e.exonStart && exon.exonEnd - exon.exonStart < e.exonEnd - e.exonStart) ||
            //smaller bar overlaping bigger one from the right
            (exon.exonStart <= e.exonEnd && exon.exonEnd > e.exonEnd && exon.exonEnd - exon.exonStart < e.exonEnd - e.exonStart)
        );
    }

    private calculateDeletionsAndDuplicationsForExon(exon: ExonDef, cnvRows: CnvRow[]): ExonDeletionsDuplications {
        const result = new ExonDeletionsDuplications(exon.start, exon.end);
        _(cnvRows)
            .filter(r => r.start <= exon.end && r.end >= exon.start)
            .forEach(r =>
                r.type === CnvType.DUPLICATION ? result.addDuplication(r.name) : result.addDeletion(r.name)
            );
        return result;
    }
}
import * as _ from "lodash";
import {ExonDef, StructureRow} from "../utils/StructureFileReader";
import {CnvRow, CnvType} from "../utils/CnvFileReader";
import {DataContainer} from "./DataContainer";
import {ExonDeletionsDuplications} from "./ExonDeletionsDuplications";

const structRows: StructureRow[] = [{
    chromosome: "chr1",
    name: "n1",
    exons: [
        {chromosome: "chr1", start: 100, end: 200},
        {chromosome: "chr1", start: 290, end: 400}
    ]
}, {
    chromosome: "chr1",
    name: "n2",
    exons: [
        {chromosome: "chr1", start: 600, end: 900},
        {chromosome: "chr1", start: 1200, end: 1450},
        {chromosome: "chr1", start: 1550, end: 2000}
    ]
}, {
    chromosome: "chr2",
    name: "n3",
    exons: [
        {chromosome: "chr2", start: 400, end: 1000}
    ]
}];

const cnvRows: CnvRow[] = [{
    chromosome: "chr1",
    name: "n1",
    source: "Case",
    start: 90,
    end: 1000,
    type: CnvType.DUPLICATION
}, {
    chromosome: "chr1",
    name: "n2",
    source: "Case",
    start: 240,
    end: 1100,
    type: CnvType.DELETION
}, {
    chromosome: "chr2",
    name: "n3",
    source: "Case",
    start: 500,
    end: 2000,
    type: CnvType.DELETION
}];

const cnvRows2: CnvRow[] = [{
   chromosome: "chr1",
   name: "n1",
   source: "Control",
   start: 100,
   end: 1050,
   type: CnvType.DUPLICATION
}, {
    chromosome: "chr2",
    name: "n4",
    source: "Control",
    start: 250,
    end: 1200,
    type: CnvType.DELETION
}];

test("get cnv rows", () => {
   const dataContainer = new DataContainer();
   dataContainer.setStructureRows(structRows);
   dataContainer.addCnvRows(cnvRows, "Case");
   dataContainer.addCnvRows(cnvRows2, "Control");

   const result = dataContainer.cnvRows;
   expect(result).toHaveLength(5);
   expect(
       _.chain(result)
           .map(r => r.chromosome)
           .uniq()
           .value()
   ).toHaveLength(2);
});

test("get chromosomes", () => {
    const dataContainer = new DataContainer();
    dataContainer.setStructureRows(structRows);
    dataContainer.addCnvRows(cnvRows, "Case");
    dataContainer.addCnvRows(cnvRows2, "Control");

    const result = dataContainer.chromosomes;
    expect(result).toHaveLength(2);
});

test("get cnv range", () => {
    const dataContainer = new DataContainer();
    dataContainer.setStructureRows(structRows);
    dataContainer.addCnvRows(cnvRows, "Case");

    expect(dataContainer.chromosomes).toHaveLength(2);
    expect(dataContainer.getCnvsRange("Case", "chr1")).toEqual({min: 90, max: 1100});
});

const delDuplStructRows: StructureRow[] = [{
    chromosome: "chr1",
    name: "n1",
    exons: [
        {chromosome: "chr1", start: 100, end: 200},
        {chromosome: "chr1", start: 290, end: 400}
    ]
}, {
    chromosome: "chr1",
    name: "n2",
    exons: [
        {chromosome: "chr1", start: 100, end: 210},
        {chromosome: "chr1", start: 1200, end: 1450},
        {chromosome: "chr1", start: 1550, end: 2000}
    ]
}, {
    chromosome: "chr2",
    name: "n3",
    exons: [
        {chromosome: "chr2", start: 400, end: 1000}
    ]
}];

const delDuplCnvRows: CnvRow[] = [{
    chromosome: "chr1",
    name: "n1",
    source: "Case",
    start: 90,
    end: 1000,
    type: CnvType.DUPLICATION
}, {
    chromosome: "chr1",
    name: "n2",
    source: "Case",
    start: 90,
    end: 1000,
    type: CnvType.DUPLICATION
}, {
    chromosome: "chr1",
    name: "n3",
    source: "Case",
    start: 130,
    end: 400,
    type: CnvType.DELETION
}, {
    chromosome: "chr1",
    name: "n4",
    source: "Case",
    start: 500,
    end: 1000,
    type: CnvType.DUPLICATION
}];

test("bars no overlap", () => {
    const exonsDelDupl = [
        new ExonDeletionsDuplications(100, 200),
        new ExonDeletionsDuplications(100, 210)
    ];
    const delDupl = new ExonDeletionsDuplications(100, 200);
    const result = DataContainer.barNoOverlap(delDupl, exonsDelDupl);
    expect(result).toBeFalsy();
});

test("get deletions and duplications", () => {
    const container = new DataContainer();
    container.setStructureRows(delDuplStructRows);
    container.addCnvRows(delDuplCnvRows, "Case");

    const controlDelDupl = container.getDeletionsDuplications("Control", "chr1", 10, 10000);
    expect(controlDelDupl).toHaveLength(4);
    expect(_.map(controlDelDupl, c => c.deletions)).toEqual([0, 0, 0, 0]);
    expect(_.map(controlDelDupl, c => c.duplications)).toEqual([0, 0, 0, 0]);

    const caseDelDupl = container.getDeletionsDuplications("Case", "chr1", 10, 10000);
    expect(caseDelDupl).toHaveLength(4);
    expect(caseDelDupl[0].duplications).toBe(2);
    expect(caseDelDupl[0].deletions).toBe(1);
    expect(caseDelDupl[3].duplications).toBe(0);
    expect(caseDelDupl[3].deletions).toBe(0);
});
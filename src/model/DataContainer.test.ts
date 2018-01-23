import {StructureRow} from "../utils/StructureFileReader";
import {CnvRow, CnvType} from "../utils/CnvFileReader";
import {DataContainer} from "./DataContainer";

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
    name: "n2",
    source: "Case",
    start: 500,
    end: 2000,
    type: CnvType.DELETION
}];

test("test cnv range is calculated correctly", () => {
    const dataContainer = new DataContainer();
    dataContainer.setStructureRows(structRows);
    dataContainer.addCnvRows(cnvRows, "Case");

    expect(dataContainer.chromosomes).toHaveLength(2);
    expect(dataContainer.getCnvsRange("Case", "chr1")).toBe({min: 90, max: 1100});
});
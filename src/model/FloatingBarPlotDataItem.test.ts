import {FloatingBarPlotDataItem} from "./FloatingBarPlotDataItem";
import {CnvRow, CnvType} from "../utils/CnvFileReader";


test("floating bar plot data item is created correctly", () => {
    const cnvRow: CnvRow= {
        name: "n1",
        chromosome: "chr1",
        start: 200,
        end: 800,
        type: CnvType.DELETION,
        source: "Case"
    };
    const floatingBarPlotDataItem = new FloatingBarPlotDataItem(cnvRow);

    expect(floatingBarPlotDataItem.name).toBe("n1");
    expect(floatingBarPlotDataItem.start).toBe(200);
    expect(floatingBarPlotDataItem.length).toBe(600);
    expect(floatingBarPlotDataItem.hoverText).toBe("Type: Deletion<br>Start position: 200<br>End position: 800");
});
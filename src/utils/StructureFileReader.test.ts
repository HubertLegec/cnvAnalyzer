import {StructureFileReader} from "./StructureFileReader";

test("read file lines", () => {
    const filename = "cnvTest.txt";
    const file = new File(
        [
            "585	NR_046018.2	chr1	+	11873	14409	14409	14409	3	11873,12612,13220,	12227,12721,14409,	0	DDX11L1	none	none	-1,-1,-1,\n" +
            "585	NR_024540.1	chr1	-	14361	29370	29370	29370	11	14361,14969,15795,16606,16857,17232,17605,17914,18267,24737,29320,	14829,15038,15947,16765,17055,17368,17742,18061,18366,24891,29370,	0	WASH7P	none	none	-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,"
        ],
        filename,
        {type: "text/plain"}
    );
    const txtReader = new StructureFileReader(file);
    txtReader.getStructureRows().then(rows => {
        expect(rows).toHaveLength(2);
        expect(rows[0].chromosome).toBe("chr1");
        expect(rows[0].geneName).toBe("DDX11L1");
        expect(rows[0].exons).toHaveLength(3);
        expect(rows[1].chromosome).toBe("chr1");
        expect(rows[1].geneName).toBe("WASH7P");
        expect(rows[1].exons).toHaveLength(11);
    });
});
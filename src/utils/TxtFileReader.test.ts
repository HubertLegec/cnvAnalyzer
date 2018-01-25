import {TxtFileReader} from "./TxtFileReader";

test("read file lines", () => {
    const filename = "cnvTest.txt";
    const file = new File(
        ["1\tchr1\t844145\t9804104\tnssv3461613\t0\t.\t844145\t9804104\t14\tID,Name,Alias,parent,Dbxref,Start_range,End_range,remapScore,sample_name,phenotype,gender,Variant_seq,Reference_seq,var_type,\t88995,nssv3461613,6,nsv1002571,URL:www.ncbi.nlm.nih.gov/dbvar/variants/nsv1002571,.%2C844146,9804104%2C.,0.99363,9906919,not_reported,F,-%2C.,~,copy_number_loss,\n" +
        "9\tchr1\t844145\t5315789\tnssv3458820\t0\t.\t844145\t5315789\t14\tID,Name,Alias,parent,Dbxref,Start_range,End_range,remapScore,sample_name,phenotype,gender,Variant_seq,Reference_seq,var_type,\t86176,nssv3458820,4,nsv998240,URL:www.ncbi.nlm.nih.gov/dbvar/variants/nsv998240,.%2C844146,5315789%2C.,0.9923,9908461,not_reported,F,-%2C.,~,copy_number_loss"],
        filename,
        {type: "text/plain"}
    );
    const txtReader = new TxtFileReader(file);
    txtReader.readFile().then(lines => {
        expect(lines).toHaveLength(2);
    });
});
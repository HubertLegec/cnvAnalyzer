import {ExonDeletionsDuplications} from "./ExonDeletionsDuplications";


test("deletions duplications object is created correctly", () => {
    const deletionsDuplications = new ExonDeletionsDuplications(200, 400);
    deletionsDuplications.addDeletion("del 1");
    deletionsDuplications.addDeletion("del 2");
    deletionsDuplications.addDuplication("duplication 1");

    expect(deletionsDuplications.exonCenter).toBe(300);
    expect(deletionsDuplications.deletions).toBe(2);
    expect(deletionsDuplications.duplications).toBe(1);
    expect(deletionsDuplications.exonStart).toBe(200);
    expect(deletionsDuplications.exonEnd).toBe(400);
    expect(deletionsDuplications.duplicationsText).toBe("duplication 1");
    expect(deletionsDuplications.deletionsText).toBe("del 1<br>del 2");
});
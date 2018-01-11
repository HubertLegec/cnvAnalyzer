
export class TxtFileReader {
    private file: File;
    private reader = new FileReader();

    constructor(file: File) {
        this.file = file;
    }

    protected readFile(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.reader.onload = (event) => {
                const file = (event.target as any).result;
                const allLines = file.split(/\r\n|\n/);
                resolve(allLines);
            };
            this.reader.onerror = (evt) => {
                reject((evt.target as any).error);
            };
            this.reader.readAsText(this.file);
        });
    }
}
const mockResponses = {
    "file1.txt": `Hello world! : 2024-02-22 14:35:30 UTC
  Goodbye world! : 2024-02-22 16:35:30 UTC
  Hello? : 2024-02-22 08:35:30 UTC
 Hi : 2024-02-22 12:35:30 UTC`,
    "file2.txt": `How are you doing ? : 2024-02-22 13:59:30 UTC
  Fine : 2024-02-22 12:44:30 UTC
  How about you ? : 2024-02-22 22:35:30 UTC
  Same : 2024-02-22 07:39:30 UTC`,
    "file3.txt": `Have you seen high elves ? : 2022-02-22 14:35:30 UTC
  HESOYAM : 2023-02-22 14:35:30 UTC
  BAGUVIX : 2021-02-22 14:35:30 UTC
  THERE IS NO SPOON : 2020-02-22 14:35:30 UTC`,
};
class SimpleFileReader {
    constructor() {
        this.EMPTY = 0;
        this.LOADING = 1;
        this.DONE = 2;
    }
    async readFile(filePath) {
        var _a;
        return (_a = mockResponses[filePath]) !== null && _a !== void 0 ? _a : "";
    }
}
class SimpleLineParser {
    parseLine(line) {
        const [message, timestamp] = line.split(" : ");
        return { message: message.trim(), timestamp: timestamp.trim() };
    }
}
class SimpleMessageSender {
    async sendMessage(filename, content) {
        console.log(`Sending message "${content.message}" from file ${filename}`);
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));
    }
}
class FileProcessorImpl {
    constructor(fileReader, lineParser, messageSender) {
        this.fileReader = fileReader;
        this.lineParser = lineParser;
        this.messageSender = messageSender;
    }
    async processFile(filePath, outputFile) {
        try {
            const fileContent = await this.fileReader.readFile(filePath);
            const lines = fileContent.split("\n");
            for (const line of lines) {
                const parsedContent = this.lineParser.parseLine(line);
                await this.messageSender.sendMessage(outputFile, parsedContent);
            }
        }
        catch (error) {
            console.error(`Error processing file ${filePath}: ${error}`);
        }
    }
}
class AdvancedFileProcessor {
    constructor(fileReaders, lineParsers, messageSenders) {
        this.fileReaders = fileReaders;
        this.lineParsers = lineParsers;
        this.messageSenders = messageSenders;
    }
    async processFile(filePath, outputFile) {
        const index = Math.floor(Math.random() * this.fileReaders.length);
        const fileReader = this.fileReaders[index];
        const lineParser = this.lineParsers[index];
        const messageSender = this.messageSenders[index];
        try {
            const fileContent = await fileReader.readFile(filePath);
            const lines = fileContent.split("\n");
            for (const line of lines) {
                const parsedContent = lineParser.parseLine(line);
                await messageSender.sendMessage(outputFile, parsedContent);
            }
        }
        catch (error) {
            console.error(`Error processing file ${filePath}: ${error}`);
        }
    }
}
class ComplexMessageSender {
    async sendMessage(filename, content) {
        console.log(`Sending complex message "${content.message}" from file ${filename}`);
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));
    }
}
class ComplexLineParser {
    parseLine(line) {
        const [message, timestamp] = line.split(" : ");
        return { message: message.trim(), timestamp: timestamp.trim() };
    }
}
class MultiFileReader {
    constructor() {
        this.EMPTY = 0;
        this.LOADING = 1;
        this.DONE = 2;
    }
    async readFile(filePath) {
        var _a;
        return (_a = mockResponses[filePath]) !== null && _a !== void 0 ? _a : "";
    }
}
const main = async () => {
    const files = {
        "file1.txt": "out1.txt",
        "file2.txt": "out2.txt",
        "file3.txt": "out3.txt",
    };
    const simpleFileReader = new SimpleFileReader();
    const simpleLineParser = new SimpleLineParser();
    const simpleMessageSender = new SimpleMessageSender();
    const fileProcessor = new FileProcessorImpl(simpleFileReader, simpleLineParser, simpleMessageSender);
    const advancedFileProcessor = new AdvancedFileProcessor([simpleFileReader, new MultiFileReader()], [simpleLineParser, new ComplexLineParser()], [simpleMessageSender, new ComplexMessageSender()]);
    const processingPromises = [];
    for (const inputFile of Object.keys(files)) {
        const outputFile = files[inputFile];
        processingPromises.push(fileProcessor.processFile(inputFile, outputFile));
        processingPromises.push(advancedFileProcessor.processFile(inputFile, outputFile));
    }
    await Promise.all(processingPromises);
};
main();

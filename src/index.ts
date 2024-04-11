const mockResponses: Record<string, string> = {
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

interface FileContent {
  message: string;
  timestamp: string;
}

interface FileReader {
  readFile(filePath: string): Promise<string>;
}

interface LineParser {
  parseLine(line: string): FileContent;
}

interface MessageSender {
  sendMessage(filename: string, content: FileContent): Promise<void>;
}

interface FileProcessor {
  processFile(filePath: string, outputFile: string): Promise<void>;
}

class SimpleFileReader implements FileReader {
  async readFile(filePath: string) {
    return mockResponses[filePath] ?? "";
  }
  error: any;
  onabort: any;
  onerror: any;
  onload: any;
  onloadend: any;
  onloadstart: any;
  onprogress: any;
  readyState: any;
  result: any;
  abort: any;
  readAsArrayBuffer: any;
  readAsBinaryString: any;
  readAsDataURL: any;
  readAsText: any;
  EMPTY: 0 = 0;
  LOADING: 1 = 1;
  DONE: 2 = 2;
  addEventListener: any;
  dispatchEvent: any;
  removeEventListener: any;
}

class SimpleLineParser implements LineParser {
  parseLine(line: string): FileContent {
    const [message, timestamp] = line.split(" : ");
    return { message: message.trim(), timestamp: timestamp.trim() };
  }
}

class SimpleMessageSender implements MessageSender {
  async sendMessage(filename: string, content: FileContent) {
    console.log(`Sending message "${content.message}" from file ${filename}`);
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));
  }
}

class FileProcessorImpl implements FileProcessor {
  constructor(
    private fileReader: FileReader,
    private lineParser: LineParser,
    private messageSender: MessageSender
  ) {}

  async processFile(filePath: string, outputFile: string) {
    try {
      const fileContent = await this.fileReader.readFile(filePath);
      const lines = fileContent.split("\n");
      for (const line of lines) {
        const parsedContent = this.lineParser.parseLine(line);
        await this.messageSender.sendMessage(outputFile, parsedContent);
      }
    } catch (error) {
      console.error(`Error processing file ${filePath}: ${error}`);
    }
  }
}

class AdvancedFileProcessor implements FileProcessor {
  constructor(
    private fileReaders: FileReader[],
    private lineParsers: LineParser[],
    private messageSenders: MessageSender[]
  ) {}

  async processFile(filePath: string, outputFile: string) {
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
    } catch (error) {
      console.error(`Error processing file ${filePath}: ${error}`);
    }
  }
}

class ComplexMessageSender implements MessageSender {
  async sendMessage(filename: string, content: FileContent) {
    console.log(
      `Sending complex message "${content.message}" from file ${filename}`
    );
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));
  }
}

class ComplexLineParser implements LineParser {
  parseLine(line: string): FileContent {
    const [message, timestamp] = line.split(" : ");
    return { message: message.trim(), timestamp: timestamp.trim() };
  }
}

class MultiFileReader implements FileReader {
  async readFile(filePath: string) {
    return mockResponses[filePath] ?? "";
  }
  error: any;
  onabort: any;
  onerror: any;
  onload: any;
  onloadend: any;
  onloadstart: any;
  onprogress: any;
  readyState: any;
  result: any;
  abort: any;
  readAsArrayBuffer: any;
  readAsBinaryString: any;
  readAsDataURL: any;
  readAsText: any;
  EMPTY: 0 = 0;
  LOADING: 1 = 1;
  DONE: 2 = 2;
  addEventListener: any;
  dispatchEvent: any;
  removeEventListener: any;
}

const main = async () => {
  const files: Record<string, string> = {
    "file1.txt": "out1.txt",
    "file2.txt": "out2.txt",
    "file3.txt": "out3.txt",
  };

  const simpleFileReader = new SimpleFileReader();
  const simpleLineParser = new SimpleLineParser();
  const simpleMessageSender = new SimpleMessageSender();
  const fileProcessor = new FileProcessorImpl(
    simpleFileReader,
    simpleLineParser,
    simpleMessageSender
  );

  const advancedFileProcessor = new AdvancedFileProcessor(
    [simpleFileReader, new MultiFileReader()],
    [simpleLineParser, new ComplexLineParser()],
    [simpleMessageSender, new ComplexMessageSender()]
  );

  const processingPromises: Promise<void>[] = [];

  for (const inputFile of Object.keys(files)) {
    const outputFile = files[inputFile];
    processingPromises.push(fileProcessor.processFile(inputFile, outputFile));
    processingPromises.push(
      advancedFileProcessor.processFile(inputFile, outputFile)
    );
  }

  await Promise.all(processingPromises);
};

main();

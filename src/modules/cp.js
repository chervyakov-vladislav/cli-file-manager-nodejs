import fs from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import path, { isAbsolute } from "path";

import { pathController } from "../path/pathController.js";
import { messageReporter } from "../messages/messageReporter.js";
import { utils } from "../utils/utils.js";

class CP {
  async copy(values) {
    try {
      if (values.length !== 2) {
        process.stdout.write("\n Input 2 arguments without spaces\n");
        throw new Error();
      }
      const currentDir = pathController.getPath();
      const separator = path.sep;

      const argumentFile = values[0];
      const argumentDirectory = values[1];

      const pathToOldFile = isAbsolute(argumentFile)
        ? argumentFile
        : path.join(currentDir, argumentFile);

      const fileName = pathToOldFile.split(separator).pop();

      const pathToNewDirectoryForCheck = isAbsolute(argumentDirectory)
        ? argumentDirectory
        : path.join(currentDir, argumentDirectory);

      const pathToNewDirectory = isAbsolute(argumentDirectory)
        ? path.join(argumentDirectory, fileName)
        : path.join(currentDir, argumentDirectory, fileName);

      const isValidDirectory = await utils.isValidDirectory(
        pathToNewDirectoryForCheck
      );

      if (!isValidDirectory) {
        process.stdout.write("\ndirectory does not exist\n");
        throw new Error();
      }

      const isFileExist = await fs
        .access(pathToOldFile)
        .then(() => true)
        .catch(() => false);

      if (!isFileExist) {
        process.stdout.write("\nfile does not exist\n");
        throw new Error();
      }

      const isFile = !(await utils.isValidDirectory(pathToOldFile));

      if (!isFile) {
        process.stdout.write(
          "\n1st argument is directory. technical requirements only provide for file copying\n"
        );
        throw new Error();
      }

      const isNewFileExist = await fs
        .access(pathToNewDirectory)
        .then(() => true)
        .catch(() => false);

      if (isNewFileExist) {
        process.stdout.write("\nnew file already exist\n");
        throw new Error();
      }

      const readStream = createReadStream(pathToOldFile, "utf-8");
      const writeStream = createWriteStream(pathToNewDirectory);
      readStream.pipe(writeStream);

      readStream.on("end", () => {
        process.stdout.write("\n");
        messageReporter.printCurrentDir();
      });
    } catch {
      messageReporter.printOperationFailed();
      messageReporter.printCurrentDir();
    }
  }
}

const cp = new CP();
export { cp };

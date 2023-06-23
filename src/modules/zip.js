import { createReadStream, createWriteStream } from "fs";
import zlib from "zlib";
import path, { isAbsolute } from "path";
import fs from "fs/promises";

import { pathController } from "../path/pathController.js";
import { messageReporter } from "../messages/messageReporter.js";
import { utils } from "../utils/utils.js";

class Zip {
  async compress(values) {
    try {
      const paths = await this.#checkValidity("compress", values);

      const zlibBrotli = zlib.createBrotliCompress();
      const readStream = createReadStream(paths.pathToOldFile);
      const writeStream = createWriteStream(paths.pathToNewDirectory);
      readStream.pipe(zlibBrotli).pipe(writeStream);

      writeStream.on("finish", () => {
        process.stdout.write("\n");
        messageReporter.printCurrentDir();
      });
    } catch {}
  }

  async decompress(values) {
    try {
      const paths = await this.#checkValidity("decompress", values);

      const zlibBrotli = zlib.createBrotliDecompress();
      const readStream = createReadStream(paths.pathToOldFile);
      const writeStream = createWriteStream(paths.pathToNewDirectory);
      readStream.pipe(zlibBrotli).pipe(writeStream);

      writeStream.on("finish", () => {
        process.stdout.write("\n");
        messageReporter.printCurrentDir();
      });
    } catch {}
  }

  async #checkValidity(variant, values) {
    try {
      if (values.length !== 2) {
        process.stdout.write("\n Input 2 arguments without spaces\n");
        throw new Error();
      }
      const isCompress = variant === "compress";
      const currentDir = pathController.getPath();
      const separator = path.sep;

      const argumentFile = values[0];
      const argumentDirectory = values[1];

      const pathToOldFile = isAbsolute(argumentFile)
        ? argumentFile
        : path.join(currentDir, argumentFile);

      let fileName = isCompress
        ? `${pathToOldFile.split(separator).pop()}.gz`
        : pathToOldFile.split(separator).pop();

      if (!isCompress && !fileName.endsWith(".gz")) {
        process.stdout.write("\nWrong file\n");
        throw new Error();
      }

      if (!isCompress) {
        fileName = fileName.slice(0, -3);
      }

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
          "\n1st argument is directory. technical requirements only provide for file compress\n"
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

      return {
        pathToOldFile,
        pathToNewDirectory,
      };
    } catch {
      messageReporter.printOperationFailed();
      messageReporter.printCurrentDir();
    }
  }
}

const zip = new Zip();
export { zip };

import fs from "fs/promises";
import path from "path";

import { pathController } from "../path/pathController.js";
import { messageReporter } from "../messages/messageReporter.js";
import { utils } from "../utils/utils.js";

class RN {
  async rename(values) {
    try {
      if (values.length !== 2) {
        process.stdout.write("\n Input 2 arguments without spaces\n");
        throw new Error();
      }

      const oldFileName = values[0];
      const newFileName = values[1];

      const currentDir = pathController.getPath();

      const pathToNewFile = path.join(currentDir, newFileName);
      const pathToOldFile = path.join(currentDir, oldFileName);

      const isFileExist = await fs
        .access(pathToOldFile)
        .then(() => true)
        .catch(() => false);

      if (!isFileExist) {
        process.stdout.write("\nfile does not exist\n");
        throw new Error();
      }

      const isDir = await utils.isValidDirectory(pathToOldFile);

      if (isDir) {
        process.stdout.write("\nThis is a directory\n");
        throw new Error();
      }

      await fs.rename(pathToOldFile, pathToNewFile);
      messageReporter.printCurrentDir();
    } catch {
      messageReporter.printOperationFailed();
      messageReporter.printCurrentDir();
    }
  }
}

const rn = new RN();
export { rn };

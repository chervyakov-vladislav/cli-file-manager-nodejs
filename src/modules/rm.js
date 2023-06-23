import fs from "fs/promises";
import path, { isAbsolute } from "path";

import { pathController } from "../path/pathController.js";
import { messageReporter } from "../messages/messageReporter.js";
import { utils } from "../utils/utils.js";

class RM {
  async remove(values) {
    try {
      const currentDir = pathController.getPath();
      const argumentFile = values.join(" ");

      const pathToRemovingFile = isAbsolute(argumentFile)
        ? argumentFile
        : path.join(currentDir, argumentFile);

      const isFileExist = await fs
        .access(pathToRemovingFile)
        .then(() => true)
        .catch(() => false);

      if (!isFileExist) {
        process.stdout.write("\nfile does not exist\n");
        throw new Error();
      }

      const isFile = !(await utils.isValidDirectory(pathToRemovingFile));

      if (!isFile) {
        process.stdout.write(
          "\nargument is directory. technical requirements only provide for file removing\n"
        );
        throw new Error();
      }

      await fs.rm(pathToRemovingFile);
      process.stdout.write("\n");
      messageReporter.printCurrentDir();
    } catch {
      messageReporter.printOperationFailed();
      messageReporter.printCurrentDir();
    }
  }
}

const rm = new RM();
export { rm };

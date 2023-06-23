import path from "path";
import fs from "fs/promises";

import { messageReporter } from "../messages/messageReporter.js";
import { pathController } from "../path/pathController.js";

class Add {
  async createFile(values) {
    try {
      const nameFromArgs = values.join(" ");
      const oldPath = pathController.getPath();

      const pathToCreate = path.join(oldPath, nameFromArgs);

      const isFileExist = await fs
        .access(pathToCreate)
        .then(() => true)
        .catch(() => false);

      if (isFileExist) {
        throw new Error();
      }

      await fs.writeFile(pathToCreate, "", { flag: "wx" });
      process.stdout.write("\n");
      messageReporter.printCurrentDir();
    } catch {
      messageReporter.printOperationFailed();
    }
  }
}

const add = new Add();
export { add };

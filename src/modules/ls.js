import fs from "fs/promises";

import { pathController } from "../path/pathController.js";
import { messageReporter } from "../messages/messageReporter.js";

class LS {
  async print(values) {
    if (values.length) {
      messageReporter.printOperationFailed();
      return;
    }

    const currentDir = pathController.getPath();
    const files = await fs.readdir(currentDir, { withFileTypes: true });

    const result = files.sort().map((file) => {
      return { Name: file.name, Type: file.isFile() ? "file" : "directory" };
    });

    const sortedResult = result.sort((a, b) => {
      if (a.Type < b.Type) {
        return -1;
      }
      if (a.Type > b.Type) {
        return 1;
      }
      return 0;
    });

    process.stdout.write("\n");
    console.table(sortedResult);
    messageReporter.printCurrentDir();
  }
}

const ls = new LS();

export { ls };

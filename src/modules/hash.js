import path, { isAbsolute } from "path";
import fs from "fs/promises";
import crypto from "crypto";

import { messageReporter } from "../messages/messageReporter.js";
import { pathController } from "../path/pathController.js";
import { utils } from "../utils/utils.js";

class Hash {
  async hash(values) {
    try {
      const pathFromArgs = values.join(" ");
      const oldPath = pathController.getPath();

      const pathToRead = isAbsolute(pathFromArgs)
        ? path.join(pathFromArgs)
        : path.join(oldPath, pathFromArgs);

      const isDir = await utils.isValidDirectory(pathToRead);

      if (isDir) {
        throw new Error();
      }
      const hashingAlgorithm = "sha256";
      const filehandle = await fs.open(pathToRead);
      const stream = filehandle.createReadStream({ encoding: "utf-8" });
      const hash = crypto.createHash(hashingAlgorithm).setEncoding("hex");

      stream.pipe(hash).pipe(process.stdout);
      stream.on("end", () => {
        process.stdout.write("\n");
        messageReporter.printCurrentDir();
      });
    } catch {
      messageReporter.printOperationFailed();
    }
  }
}

const hash = new Hash();
export { hash };

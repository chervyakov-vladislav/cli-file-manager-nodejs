import fs from "fs/promises";
import { messageReporter } from "../messages/messageReporter.js";

class Utils {
  getUser(args) {
    const nameArg = "--username=";

    const result = args.find((arg) => arg.startsWith(nameArg));
    if (!result || result.length === 11) return null;

    return this.capitalize(result.slice(nameArg.length));
  }

  capitalize(str) {
    return str
      .split("")
      .map((item, index) => {
        if (!index) {
          return item.toUpperCase();
        }
        return item;
      })
      .join("");
  }

  parseArgs(values) {
    const result = values
      .split(" ")
      .filter((item) => item !== "")
      .reduce(
        (obj, value, index) => {
          if (!index) {
            obj.command = value;
          } else {
            obj.args.push(value);
          }
          return obj;
        },
        {
          command: "",
          args: [],
        }
      );

    return result;
  }

  async isValidDirectory(path) {
    try {
      const info = await fs.stat(path);
      return info.isDirectory();
    } catch {
      process.stdout.write("\nno such file or directory\n");
    }
  }
}

const utils = new Utils();

export { utils };

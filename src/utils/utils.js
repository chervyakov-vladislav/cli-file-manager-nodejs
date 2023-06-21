import fs from "fs/promises";

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
}

const utils = new Utils();

export { utils };

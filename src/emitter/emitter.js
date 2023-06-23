import { EventEmitter } from "events";

import { messageReporter } from "../messages/messageReporter.js";
import { utils } from "../utils/utils.js";
import { ls, cd, cat, add, rn, cp, mv, rm } from "../modules/index.js";

class ConsoleEmitter extends EventEmitter {
  constructor() {
    super();
    this.on("up", cd.goBack);
    this.on("cd", cd.change);
    this.on("ls", ls.print);
    this.on("cat", cat.readFile);
    this.on("add", add.createFile);
    this.on("rn", rn.rename);
    this.on("cp", cp.copy);
    this.on("mv", mv.move);
    this.on("rm", rm.remove);
    this.on("os", this.#exampleMethod);
    this.on("hash", this.#exampleMethod);
    this.on("compress", this.#exampleMethod);
    this.on("decompress", this.#exampleMethod);
  }

  #exampleMethod() {
    console.log(`where is my method for this command`);
  }

  feed(value) {
    const parsedString = utils.parseArgs(value);
    const events = this.eventNames();
    const isValidCommand = events.includes(parsedString.command);

    if (
      isValidCommand &&
      (parsedString.args.length ||
        parsedString.command === "ls" ||
        parsedString.command === "up")
    ) {
      this.emit(parsedString.command, parsedString.args);
    } else {
      messageReporter.printInvalidInput();
    }
  }
}

const consoleEmitter = new ConsoleEmitter();
export { consoleEmitter };

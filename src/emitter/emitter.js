import { EventEmitter } from "events";

import { pathController } from "../path/pathController.js";
import { messageReporter } from "../messages/messageReporter.js";
import { utils } from "../utils/utils.js";
import { ls } from "../modules/index.js";

class ConsoleEmitter extends EventEmitter {
  constructor() {
    super();
    this.on("up", this.#exampleMethod);
    this.on("cd", this.#exampleMethod);
    this.on("ls", ls.print);
    this.on("cat", this.#exampleMethod);
    this.on("add", this.#exampleMethod);
    this.on("rn", this.#exampleMethod);
    this.on("cp", this.#exampleMethod);
    this.on("mv", this.#exampleMethod);
    this.on("rm", this.#exampleMethod);
    this.on("os", this.#exampleMethod);
    this.on("hash", this.#exampleMethod);
    this.on("compress", this.#exampleMethod);
    this.on("decompress", this.#exampleMethod);
  }

  #exampleMethod(value) {
    console.log(`where is my method for this command`);
  }

  feed(value) {
    const parsedString = utils.parseArgs(value);
    const events = this.eventNames();
    const isValidCommand = events.includes(parsedString.command);

    if (
      isValidCommand &&
      (parsedString.args.length || parsedString.command === "ls")
    ) {
      this.emit(parsedString.command, parsedString.args);
      const currentDir = pathController.getPath();
      messageReporter.printCurrentDir(currentDir);
    } else {
      messageReporter.printInvalidInput();
    }
  }
}

const consoleEmitter = new ConsoleEmitter();
export { consoleEmitter };

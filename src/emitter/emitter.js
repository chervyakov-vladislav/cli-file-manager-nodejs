import { EventEmitter } from "events";
import { pathController } from "../path/pathController.js";

class ConsoleEmitter extends EventEmitter {
  constructor() {
    super();
    this.on("cd", this.#exampleMethod);
  }

  #exampleMethod(value) {
    console.log(`where is my method for ${value}`);
  }

  feed(value) {
    console.log(pathController.getPath());
    const arg = "banana";
    if (value === "cd") {
      this.emit(value, value);
    }
  }
}

const consoleEmitter = new ConsoleEmitter();

export { consoleEmitter };

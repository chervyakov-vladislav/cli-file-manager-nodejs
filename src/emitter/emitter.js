import { EventEmitter } from "events";

import { messageReporter } from "../messages/messageReporter.js";
import { utils } from "../utils/utils.js";
import {
  ls,
  cd,
  cat,
  add,
  rn,
  cp,
  mv,
  rm,
  osEmitter,
  hash,
  zip,
} from "../modules/index.js";

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
    this.on("os", osEmitter.init.bind(osEmitter));
    this.on("hash", hash.hash);
    this.on("compress", zip.compress.bind(zip));
    this.on("decompress", zip.decompress.bind(zip));
  }

  feed(value) {
    const parsedArgs = utils.parseArgs(value);
    const events = this.eventNames();
    const isValidCommand = events.includes(parsedArgs.command);

    if (
      isValidCommand &&
      (parsedArgs.args.length ||
        parsedArgs.command === "ls" ||
        parsedArgs.command === "up")
    ) {
      this.emit(parsedArgs.command, parsedArgs.args);
    } else {
      messageReporter.printInvalidInput();
    }
  }
}

const consoleEmitter = new ConsoleEmitter();
export { consoleEmitter };

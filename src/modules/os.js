import { EventEmitter } from "events";
import os from "os";

import { utils } from "../utils/utils.js";
import { messageReporter } from "../messages/messageReporter.js";

class OsEmitter extends EventEmitter {
  constructor() {
    super();
    this.on("--EOL", this.#printEOL);
    this.on("--cpus", this.#printCpusInfo);
    this.on("--homedir", this.#printHomedir);
    this.on("--username", this.#printUsername);
    this.on("--architecture", this.#printArchitecture);
  }

  init(values) {
    try {
      const parsedArgs = utils.parseArgs(values.join(" "));
      const events = this.eventNames();
      const isValidCommand = events.includes(parsedArgs.command);

      if (parsedArgs.args.length > 0) {
        throw new Error();
      }

      if (isValidCommand) {
        this.emit(parsedArgs.command);
      } else {
        messageReporter.printInvalidInput();
      }
    } catch {
      messageReporter.printInvalidInput();
    }
  }

  #printEOL() {
    process.stdout.write(JSON.stringify(os.EOL));
    process.stdout.write(`\n`);
    messageReporter.printCurrentDir();
  }

  #printCpusInfo() {
    const cpus = os.cpus();
    const info = cpus.map((cpu) => {
      return { model: cpu.model, clock_rate: `${cpu.speed / 1000}ghz` };
    });
    process.stdout.write(`\namount of CPUS: ${cpus.length}\n`);
    console.log(info);
    process.stdout.write(`\n`);
    messageReporter.printCurrentDir();
  }

  #printHomedir() {
    const homedir = os.homedir();
    process.stdout.write(`Homedir: ${homedir}`);
    process.stdout.write(`\n`);
    messageReporter.printCurrentDir();
  }

  #printUsername() {
    const username = os.userInfo().username;
    process.stdout.write(`Username: ${username}`);
    process.stdout.write(`\n`);
    messageReporter.printCurrentDir();
  }

  #printArchitecture() {
    const architecture = process.arch;
    process.stdout.write(`Architecture: ${architecture}`);
    process.stdout.write(`\n`);
    messageReporter.printCurrentDir();
  }
}

const osEmitter = new OsEmitter();
export { osEmitter };

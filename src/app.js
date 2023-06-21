import { createInterface } from "readline";

import { utils } from "./utils/utils.js";
import { consoleEmitter } from "./emitter/emitter.js";
import { messageReporter } from "./messages/messageReporter.js";

export default class App {
  constructor() {
    this.user = null;
    this.args = process.argv;
    this.rl = null;
    this.stdin = process.stdin;
    this.stdout = process.stdout;
  }

  start() {
    this.rl = createInterface({
      input: this.stdin,
      output: this.stdout,
    });

    this.user = utils.getUser(this.args);

    if (!this.user) {
      messageReporter.suggestInput();
    } else {
      messageReporter.welcome(this.user);
    }

    process.on("exit", () => messageReporter.exit(this.user));

    this.rl.on("line", (line) => {
      const value = line.trim();

      if (value.includes(".exit")) {
        process.exit();
      }
      if (!this.user && !value) {
        messageReporter.suggestInput();
        this.user = value;
      } else if (this.user) {
        consoleEmitter.feed(value);
      } else {
        this.user = utils.capitalize(value);
        messageReporter.welcome(this.user);
      }
    });
  }
}

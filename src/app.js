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
      prompt: "> ",
    });

    this.user = utils.getUser(this.args);

    if (!this.user) {
      messageReporter.printSuggestInput();
    } else {
      messageReporter.printWelcome(this.user);
    }
    this.rl.prompt(true);

    process.on("exit", () => messageReporter.printExit(this.user));

    this.rl.on("line", (line) => {
      const value = line.trim();

      if (value.includes(".exit")) {
        process.exit();
      }
      if (!this.user && !value) {
        messageReporter.printSuggestInput();
        this.user = value;
      } else if (this.user) {
        consoleEmitter.feed(value, this.rl.prompt);
      } else {
        this.user = utils.capitalize(value);
        messageReporter.printWelcome(this.user);
      }
      this.rl.prompt(true);
    });
  }
}

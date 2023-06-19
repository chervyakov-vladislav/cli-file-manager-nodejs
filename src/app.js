import { createInterface } from "readline";

import { utils } from "./utils/utils.js";

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
      this.suggestInput();
    } else {
      this.welcome();
    }

    process.on("exit", () => this.exit());

    this.rl.on("line", (line) => {
      const value = line.trim();

      if (value.includes(".exit")) {
        process.exit();
      }
      if (!this.user && !value) {
        this.suggestInput();
        this.user = value;
      } else if (this.user) {
        console.log(`app working with value - ${value}`);
      } else {
        this.user = utils.capitalize(value);
        this.welcome();
      }
    });
  }

  exit() {
    const user = this.user || "User without name";
    this.stdout.write(`Thank you for using File Manager, ${user}, goodbye!\n`);
  }

  suggestInput() {
    this.stdout.write(
      `You forgot to enter a name. You can enter it now or exit the program by typing ".exit"\n`
    );
  }

  welcome() {
    this.stdout.write(`Welcome to the File Manager, ${this.user}!\n`);
  }
}

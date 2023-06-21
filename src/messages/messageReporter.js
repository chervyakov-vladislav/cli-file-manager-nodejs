import { pathController } from "../path/pathController.js";

class MessageReporter {
  printExit(value) {
    const user = value || "User without name";
    process.stdout.write(
      `\n\nThank you for using File Manager, ${user}, goodbye!\n`
    );
  }

  printSuggestInput() {
    process.stdout.write(
      `You forgot to input your name. You can enter it now or exit the program by typing ".exit"\n`
    );
  }

  printWelcome(value) {
    const currentDir = pathController.getPath();
    process.stdout.write(`Welcome to the File Manager, ${value}!\n`);
    this.printCurrentDir(currentDir);
  }

  printCurrentDir(dirName) {
    const currentDir = dirName ? dirName : pathController.getPath();
    process.stdout.write(`\nYou are currently in: ${currentDir}\n`);
  }

  printInvalidInput() {
    process.stdout.write(`Invalid input\n`);
    this.printCurrentDir();
  }

  printOperationFailed() {
    process.stdout.write(`Operation failed\n`);
    this.printCurrentDir();
  }

  printCantLeaveRoot() {
    process.stdout.write(`You cannot leave the root directory\n`);
    this.printCurrentDir();
  }
}

const messageReporter = new MessageReporter();
export { messageReporter };

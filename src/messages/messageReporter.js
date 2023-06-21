class MessageReporter {
  exit(value) {
    const user = value || "User without name";
    process.stdout.write(
      `\nThank you for using File Manager, ${user}, goodbye!\n`
    );
  }

  suggestInput() {
    process.stdout.write(
      `You forgot to enter a name. You can enter it now or exit the program by typing ".exit"\n`
    );
  }

  welcome(value) {
    process.stdout.write(`Welcome to the File Manager, ${value}!\n\n`);
  }
}

const messageReporter = new MessageReporter();
export { messageReporter };

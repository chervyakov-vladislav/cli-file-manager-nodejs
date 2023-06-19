class Utils {
  getUser(args) {
    const nameArg = "--username=";

    const result = args.find((arg) => arg.startsWith(nameArg));
    if (!result || result.length === 11) return null;

    return this.capitalize(result.slice(nameArg.length));
  }

  capitalize(str) {
    return str
      .split("")
      .map((item, index) => {
        if (!index) {
          return item.toUpperCase();
        }
        return item;
      })
      .join("");
  }
}

const utils = new Utils();

export { utils };

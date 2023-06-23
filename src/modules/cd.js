import path, { isAbsolute } from "path";

import { pathController } from "../path/pathController.js";
import { messageReporter } from "../messages/messageReporter.js";
import { utils } from "../utils/utils.js";

class CD {
  goBack(values) {
    if (values.length) {
      messageReporter.printOperationFailed();
      return;
    }

    const separator = path.sep;
    const oldPath = pathController.getPath();
    const newPath = path.join(oldPath, "..", separator);
    pathController.setPath(newPath);
    messageReporter.printCurrentDir();
  }

  async change(values) {
    const pathFromArgs = values.join(" ");
    const oldPath = pathController.getPath();
    const separator = path.sep;

    const newPath = isAbsolute(pathFromArgs)
      ? path.join(pathFromArgs, separator)
      : path.join(oldPath, pathFromArgs, separator);

    const isValid = await utils.isValidDirectory(newPath);

    if (isValid) {
      pathController.setPath(newPath);
      messageReporter.printCurrentDir();
    } else {
      messageReporter.printOperationFailed();
    }
  }
}

const cd = new CD();
export { cd };

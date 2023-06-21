import { homedir } from "os";
import { messageReporter } from "../messages/messageReporter.js";

class PathController {
  constructor() {
    this.root = homedir();
    this.path = homedir();
  }

  getPath() {
    return this.path;
  }

  setPath(newPath) {
    if (newPath.length < this.root.length) {
      messageReporter.printCantLeaveRoot();
      this.path = this.root;
    } else {
      this.path = newPath;
    }
  }
}

const pathController = new PathController();
export { pathController };

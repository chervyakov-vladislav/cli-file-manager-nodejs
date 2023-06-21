import { homedir } from "os";

class PathController {
  constructor() {
    this.root = homedir();
    this.path = homedir();
  }

  getPath() {
    return this.currentPath;
  }

  setPath(newPath) {
    if (newPath.length < this.root.length) {
      console.log("You cannot leave the root directory");
      this.path = this.root;
    } else {
      this.path = newPath;
    }
  }
}

const pathController = new PathController();
export { pathController };

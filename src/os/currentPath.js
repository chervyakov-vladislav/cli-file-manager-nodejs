import { homedir } from "os";

class CurrentPath {
  constructor() {
    this.root = homedir();
    this.path = homedir();
  }

  getPath() {
    return this.currentPath;
  }

  setPath(newPath) {
    if (newPath.length < this.root.length) {
      this.path = this.root;
    } else {
      this.path = newPath;
    }
  }
}

const currentPath = new CurrentPath();
export { currentPath };

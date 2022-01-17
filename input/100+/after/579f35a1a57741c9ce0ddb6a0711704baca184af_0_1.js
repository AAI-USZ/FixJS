function(other) {
      //TODO update this function for Reference types
      if (!arraysEquals(this.stack, other.stack) ||
          !arraysEquals(this.scope, other.scope) ||
          !arraysEquals(this.local, other.local)) {
          return false;
      }
      return true;
    }
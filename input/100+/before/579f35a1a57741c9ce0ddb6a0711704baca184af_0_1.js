function(other) {

      //TODO update this function for Reference types
      if ((this.stack.length != other.stack.length) ||
          (this.scope.length != other.scope.length) ||
          (this.local.length != other.local.length)) {
        return false;
      }

      if (!arraysEquals(this.stack, other.stack) ||
          !arraysEquals(this.scope, other.scope) ||
          !arraysEquals(this.local, other.local)) {
          return false;
      }

      return true;
    }
function(callback) {
      if (this.child) {
        if (callback) {
          this.child.once('exit', callback);
        }
        return this.child.kill('SIGTERM');
      } else {
        return typeof callback === "function" ? callback() : void 0;
      }
    }
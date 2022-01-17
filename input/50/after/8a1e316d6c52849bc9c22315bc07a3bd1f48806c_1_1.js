function() {
      if (this.autoCompile === true) {
        return this.state.set(this.currentMode(), this.getValue());
      }
    }
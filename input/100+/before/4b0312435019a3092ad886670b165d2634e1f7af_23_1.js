function Logger() {
      this.logged = new Signal;
      this.stack = [];
    }
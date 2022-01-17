function(levelClass) {
      this.client = new Milk.NetworkClient;
      this.level = new levelClass;
      return this.isReady = true;
    }
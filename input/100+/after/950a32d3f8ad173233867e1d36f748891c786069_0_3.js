function() {
      if (this.debugging) {
        return console.log.apply(this, arguments);
      }
    }
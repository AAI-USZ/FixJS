function() {
      if (this.timer) {
        Capkom.console.info("Cancel timeout");
        return clearTimeout(this.timer);
      }
    }
function() {
      if (this.timer) {
        console.info("Cancel timeout");
        return clearTimeout(this.timer);
      }
    }
function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    }
function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults.title});
      }
    }
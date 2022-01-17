function (current) {
      var key = window.prompt("Enter a url key", current);
      if (key) {
        key = this.encodeKey(key);
        this.shownGraph.setInfo("url", key);
      }
    }
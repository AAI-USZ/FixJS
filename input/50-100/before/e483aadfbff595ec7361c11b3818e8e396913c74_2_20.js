function(callback) {
      if (callback) this.bind(name, callback);
      else if (this.length) try { this.get(0)[name]() } catch(e){};
      return this;
    }
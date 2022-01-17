function Game() {
      this.render = __bind(this.render, this);
      this.isReady = false;
      this.debugOptions = window.location.hash.substr(1).split(',');
    }
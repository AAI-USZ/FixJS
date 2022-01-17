function() {
      var className, l;
      this._ready = true;
      if (typeof this.onready === "function") {
        this.onready();
      }
      if (game.hasLoaded) {
        return;
      }
      className = this.constructor.name;
      Milk.loadingStates[className] -= 1;
      console.log('DONE', className);
      if (l = document.getElementById('chat-log')) {
        l.innerHTML += "<li>Done " + className + "</li>";
      }
      if (this.isReady()) {
        return game.ready();
      }
    }
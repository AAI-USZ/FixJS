function() {
      var className, l, _base;
      this._ready = false;
      if (game.hasLoaded) {
        return;
      }
      className = this.constructor.name;
      Milk.loadingStates || (Milk.loadingStates = {});
      (_base = Milk.loadingStates)[className] || (_base[className] = 0);
      Milk.loadingStates[className] += 1;
      console.log('LOADING', className);
      if (l = $('#chat-log')) {
        return l.append("<li>Loading " + className + "</li>");
      }
    }
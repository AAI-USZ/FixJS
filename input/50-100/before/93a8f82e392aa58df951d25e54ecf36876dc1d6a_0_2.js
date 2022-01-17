function(callback) {
    var self = this;

    var hashchange = function() {
      var path = location.hash.substr(1);
      if (get(self, 'lastSetURL') === path) { return; }

      set(self, 'lastSetURL', null);

      callback(location.hash.substr(1));
    };

    get(this, 'callbacks').pushObject(hashchange);

    // This won't work on old browsers anyway, but this check prevents errors
    if (window.addEventListener) {
      window.addEventListener('hashchange', hashchange, false);
    }
  }
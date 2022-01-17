function(name, all) {
      var cacheName;
      var selector;

      if (typeof(all) === 'undefined') {
        all = false;
      }

      if (name in this.selectors) {
        cacheName = '_' + name + 'Element';
        selector = this.selectors[name];

        if (!this[cacheName]) {
          if (all) {
            this[cacheName] = document.querySelectorAll(selector);
          } else {
            this[cacheName] = document.querySelector(selector);
          }
        }

        return this[cacheName];
      }

      return null;
    }
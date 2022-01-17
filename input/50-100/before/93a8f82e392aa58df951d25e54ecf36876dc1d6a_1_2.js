function(callback) {
    var self = this;

    var popstate = function(e) {
      callback(location.pathname);
    };

    get(this, 'callbacks').pushObject(popstate);

    // This won't work on old browsers anyway, but this check prevents errors
    if (window.addEventListener) {
      window.addEventListener('popstate', popstate, false);
    }
  }
function(key, value) {
        $.cookie("tour_" + key, value, {
          expires: 25,
          path: '/'
        });
        return this._options.afterSetState(key, value);
      }
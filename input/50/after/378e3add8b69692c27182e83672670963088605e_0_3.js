function(key, value) {
        $.cookie("tour_" + key, value, {
          expires: 36500,
          path: '/'
        });
        return this._options.afterSetState(key, value);
      }
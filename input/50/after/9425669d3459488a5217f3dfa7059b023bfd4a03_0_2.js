function(event) {
        if (opts.onlyIf(this)) {
          return fireCallback(opts.callback, $(this), event, false);
        }
      }
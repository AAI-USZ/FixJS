function(event) {
        if (opts.onlyIf(this)) {
          fireCallback(opts.callback, $(this), event, false);
        }
      }
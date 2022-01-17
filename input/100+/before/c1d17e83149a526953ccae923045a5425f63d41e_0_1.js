function() {
        var state = this.readyState;
        if (state == 'complete' || state == 'loaded') {
          callback();
        }
      }
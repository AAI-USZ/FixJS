function(fn) {
      try {
        fn.call(element, event);
      } catch (e) {
        // Not much to do here since jQuery ignores these anyway
      }
    }
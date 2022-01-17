function(easingFunction) {
        return function(progress) {
          return 1 - easingFunction(1 - progress);
        };
      }
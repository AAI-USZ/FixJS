function(easing) {
        return function(progress) {
          return 1 - easing(1 - progress);
        };
      }
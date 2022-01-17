function scrollTo(offset) {
    
    
      var total = Math.abs(window.pageYOffset - offset),
          start = Math.ceil(500 * total / root.scrollHeight),
          last;

      clearTimeout(timer);
      
      (function doScroll() {
      
        if (last && window.pageYOffset !== last) {
          // Manually moved by the user so stop scrolling.
          return clearTimeout(timer);
        }

        var difference = window.pageYOffset - offset,
            direction  = difference < 1 ? 1 : -1,
            modifier   = Math.abs(difference) / total,
            increment  = Math.ceil(start * modifier);
        
        if (difference !== last && (direction < 0 || window.innerHeight + window.pageYOffset !== root.scrollHeight)) {
          if (difference < increment && difference > increment * -1) {
            increment = Math.abs(difference);
          }
          last = window.pageYOffset + (increment * direction);
          window.scrollTo(0, last);
          timer = setTimeout(doScroll, 1000 / 60);
        }
      })();
    }
function doScroll() {
      
        if (last && window.scrollY !== last) {
          // Manually moved by the user so stop scrolling.
          return clearTimeout(timer);
        }

        var difference = window.scrollY - offset,
            direction  = difference < 1 ? 1 : -1,
            modifier   = Math.abs(difference) / total,
            increment  = Math.ceil(start * modifier);
        
        if (difference !== last && (direction < 0 || window.innerHeight + window.scrollY !== root.scrollHeight)) {
          if (difference < increment && difference > increment * -1) {
            increment = Math.abs(difference);
          }
          last = window.scrollY + (increment * direction);
          window.scrollTo(0, last);
          timer = setTimeout(doScroll, 1000 / 60);
        }
      }
function(x, y) {
        if (x != null) scroller.scrollLeft = x;
        if (y != null) scroller.scrollTop = y;
        updateDisplay([]);
      }
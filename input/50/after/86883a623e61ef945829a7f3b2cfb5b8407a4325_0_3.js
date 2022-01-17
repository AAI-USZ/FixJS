function(x, y) {
        if (x != null) scroller.scrollLeft = x;
        if (y != null) scrollbar.scrollTop = y;
        updateDisplay([]);
      }
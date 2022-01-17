function scrollIntoView(x1, y1, x2, y2) {
      var pl = paddingLeft(), pt = paddingTop();
      y1 += pt; y2 += pt; x1 += pl; x2 += pl;
      var screen = scroller.clientHeight, screentop = scroller.scrollTop, scrolled = false, result = true;
      if (y1 < screentop) {scroller.scrollTop = Math.max(0, y1); scrolled = true;}
      else if (y2 > screentop + screen) {scroller.scrollTop = y2 - screen; scrolled = true;}

      var screenw = scroller.clientWidth, screenleft = scroller.scrollLeft;
      var gutterw = options.fixedGutter ? gutter.clientWidth : 0;
      var atLeft = x1 < gutterw + pl + 10;
      if (x1 < screenleft + gutterw || atLeft) {
        if (atLeft) x1 = 0;
        scroller.scrollLeft = Math.max(0, x1 - 10 - gutterw);
        scrolled = true;
      }
      else if (x2 > screenw + screenleft - 3) {
        scroller.scrollLeft = x2 + 10 - screenw;
        scrolled = true;
        if (x2 > code.clientWidth) result = false;
      }
      if (scrolled && options.onScroll) options.onScroll(instance);
      return result;
    }
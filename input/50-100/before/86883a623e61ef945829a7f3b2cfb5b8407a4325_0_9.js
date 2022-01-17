function scrollCursorIntoView() {
      var cursor = localCoords(sel.inverted ? sel.from : sel.to);
      var x = options.lineWrapping ? Math.min(cursor.x, lineSpace.offsetWidth) : cursor.x;
      return scrollIntoView(x, cursor.y, x, cursor.yBot);
    }
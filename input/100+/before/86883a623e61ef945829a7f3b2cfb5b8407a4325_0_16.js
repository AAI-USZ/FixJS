function moveV(dir, unit) {
      var dist = 0, pos = localCoords(sel.inverted ? sel.from : sel.to, true);
      if (goalColumn != null) pos.x = goalColumn;
      if (unit == "page") dist = Math.min(scroller.clientHeight, window.innerHeight || document.documentElement.clientHeight);
      else if (unit == "line") dist = textHeight();
      var target = coordsChar(pos.x, pos.y + dist * dir + 2);
      if (unit == "page") scroller.scrollTop += localCoords(target, true).y - pos.y;
      setCursor(target.line, target.ch, true);
      goalColumn = pos.x;
    }
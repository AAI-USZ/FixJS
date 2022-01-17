function onDoubleClick(e) {
      for (var n = e_target(e); n != wrapper; n = n.parentNode)
        if (n.parentNode == gutterText) return e_preventDefault(e);
      var start = posFromMouse(e);
      if (!start) return;
      lastDoubleClick = {time: +new Date, pos: start};
      e_preventDefault(e);
      selectWordAt(start);
    }
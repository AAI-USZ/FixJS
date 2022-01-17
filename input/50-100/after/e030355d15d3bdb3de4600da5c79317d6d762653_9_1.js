function(newText, transformCursor) {
      var newSelection, scrollTop;
      newSelection = [transformCursor(elem.selectionStart), transformCursor(elem.selectionEnd)];
      scrollTop = elem.scrollTop;
      elem.value = newText;
      if (elem.scrollTop !== scrollTop) {
        elem.scrollTop = scrollTop;
      }
      return elem.selectionStart = newSelection[0], elem.selectionEnd = newSelection[1], newSelection;
    }
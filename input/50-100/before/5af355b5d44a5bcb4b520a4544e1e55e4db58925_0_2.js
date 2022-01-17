function(domElement, offset) {
        var
          selection = window.getSelection(),
          focusPoint = getFocusPointAtOffset(domElement, offset),
          range = document.createRange();
        // Remove existing selections
        if (window.getSelection)
          if (selection.rangeCount > 0) 
            selection.removeAllRanges();
        range.setStart(focusPoint[0], focusPoint[1]);
        range.setEnd(focusPoint[0], focusPoint[1]);
        selection.addRange(range);
      }
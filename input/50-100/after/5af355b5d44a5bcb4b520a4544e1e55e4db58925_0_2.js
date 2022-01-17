function(domElement, offset) {
        if (!window.getSelection)
          return;
        var
          selection = window.getSelection(),
          focusPoint = getFocusPointAtOffset(domElement, offset),
          range = document.createRange();
        // Remove existing selections
        if (selection.rangeCount > 0)
          selection.removeAllRanges();
        // Set the new selection to the focus point
        range.setStart(focusPoint[0], focusPoint[1]);
        range.setEnd(focusPoint[0], focusPoint[1]);
        selection.addRange(range);
      }
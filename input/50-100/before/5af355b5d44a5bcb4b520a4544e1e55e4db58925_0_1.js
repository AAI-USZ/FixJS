function(domElement) {
        if (!window.getSelection)
          return 0;
        var selection = window.getSelection();
        if (selection.focusNode === domElement)
          return getFocusInSelection(selection);
        if (selection.focusNode == null)
          return null;
        return getParentNodeOffset(domElement, selection.focusNode) + getFocusInSelection(selection);
      }
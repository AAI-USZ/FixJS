function(domElement) {
        if (!window.getSelection)
          return null;
        var selection = window.getSelection();
        if (!selection.containsNode(domElement)) 
          return null;
        if (selection.focusNode === domElement)
          return getFocusInSelection(selection);
        if (selection.focusNode == null)
          return null;
        return getParentNodeOffset(domElement, selection.focusNode) + getFocusInSelection(selection);
      }
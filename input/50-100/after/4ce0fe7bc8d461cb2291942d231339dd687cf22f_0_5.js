function(previousNode, nextNode, options) {
        var cursorPosition;
        cursorPosition = previousNode.getCursorPosition();
        nextNode.focus();
        if (((options != null ? options.maxPosition : void 0) != null) && options.maxPosition) {
          return nextNode.setCursorPosition(nextNode.val().length);
        } else {
          return nextNode.setCursorPosition(cursorPosition);
        }
      }
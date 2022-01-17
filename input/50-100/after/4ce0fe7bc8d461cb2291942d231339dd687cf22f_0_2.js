function(nextLineId) {
        var cursorPosition;
        cursorPosition = this.descriptionField.getCursorPosition();
        $(this.el).insertAfter($("#" + nextLineId));
        return this.descriptionField.setCursorPosition(cursorPosition);
      }
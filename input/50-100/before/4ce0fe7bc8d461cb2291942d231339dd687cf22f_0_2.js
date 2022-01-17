function(nextLineId) {
        var cursorPosition;
        cursorPosition = helpers.getCursorPosition(this.descriptionField);
        $(this.el).insertAfter($("#" + nextLineId));
        helpers.setCursorPosition(this.descriptionField, cursorPosition);
        return this.descriptionField.setCursorPosition(cursorPosition);
      }
function(event, selection) {
        var position;
        if (!event) {
          return;
        }
        if (event.originalEvent instanceof KeyboardEvent) {
          return this._getCaretPosition(selection);
        }
        if (event.originalEvent instanceof MouseEvent) {
          return position = {
            top: event.pageY,
            left: event.pageX
          };
        }
      }
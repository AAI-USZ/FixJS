function(event, selection) {
        var eventType, position;
        if (!event) {
          return;
        }
        eventType = event.type;
        if (eventType === "keydown" || eventType === "keyup" || eventType === "keypress") {
          return this._getCaretPosition(selection);
        }
        if (eventType === "click" || eventType === "mousedown" || eventType === "mouseup") {
          return position = {
            top: event.pageY,
            left: event.pageX
          };
        }
      }
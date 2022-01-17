function(node, event) {
      // Always preventDefault, as this terminates processing of the click as a
      // drag event.
      event.preventDefault();
      // suppress the subsequent click if this was actually a left click
      if (event.button === 0) {
        Cards._suppressClick = true;
      }

      return holdFunc(node, event);
    }
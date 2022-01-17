function(node, event) {
      // suppress the subsequent click if this was actually a left click
      if (event.button === 0)
        suppressClick = true;
      else // avoid firefox context menu...
        event.preventDefault();

      return holdFunc(node, event);
    }
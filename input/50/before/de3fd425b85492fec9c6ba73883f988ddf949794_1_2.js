function(node, event) {
      // suppress the subsequent click if this was actually a left click
      if (event.button === 0) {
        console.log('context from 0 observed, suppressing');
        Cards._suppressClick = true;
      }
      else // avoid firefox context menu...
        event.preventDefault();

      return holdFunc(node, event);
    }
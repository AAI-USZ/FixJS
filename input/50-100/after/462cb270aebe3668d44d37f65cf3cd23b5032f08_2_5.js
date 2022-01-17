function debounced() {
      /* The debounced function captures its current context and arguments
       * to be passed to func later. */
      var context = this, args = arguments;
      /* This function will be executed at the end of debouncing. */
      var delayed = function delayed() {
        /* If we chose to execute at the end of debouncing, then do it now. */
        if (!execAsap) {
          func.apply(context, args);
        }
        /* Indicate debouncing has ended. */
        timeout = null;
      };
      /* If we're debouncing, clear the clock. We'll set it again later. */
      if (timeout) {
        clearTimeout(timeout);
      /* Else we're starting debouncing, so if we chose to execute 
       * immediately, then do it now. */
      } else if (execAsap) {
        func.apply(context, args);
      }
      /* Set the clock. */
      timeout = setTimeout(delayed, threshold);
    }
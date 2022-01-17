function delayed () {
        /* If we chose to execute at the end of debouncing, then do it now. */
        if (!execAsap)
          func.apply(context, args);
        /* Indicate debouncing has ended. */
        timeout = null; 
      }
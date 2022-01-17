function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      }
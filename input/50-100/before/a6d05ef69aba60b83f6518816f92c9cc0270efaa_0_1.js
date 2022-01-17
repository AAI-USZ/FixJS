function readListener() {
      var maybe = read(view);
      if ("value" in maybe) {
        variable(maybe.value);
      } else if ("error" in maybe) {
        WARNING("validation error: " + maybe.error);
      } else {
        ERROR("expected error monad from read");
      }
    }
function readListener() {
      var maybe = read(view);
      if (maybe.hasOwnProperty("value")) {
        variable(maybe.value);
      } else if (maybe.hasOwnProperty("error")) {
        WARNING("validation error: " + maybe.error);
      } else {
        ERROR("expected error monad from read");
      }
    }
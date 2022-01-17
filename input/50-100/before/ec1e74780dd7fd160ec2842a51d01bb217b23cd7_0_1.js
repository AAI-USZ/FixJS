function parseProperties(node) {
    consume(); // '('

    while(true) {
      clear();
      /**
       * Properties always have to start with '.'
       * o(.x, .y) -> An object with at least the two
       * properties x and y.
       */
      if(peek() === '.') {
        parseProperty(node);
      }
      clear();

      if(peek() !== ',') {
        break;
      } else {
        consume(); // ','
      }
    }
  }
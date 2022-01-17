function parseArray(AST) {
    consume(); // 'a'

    var rest, node;
    node = newNode('array', AST);

    if(hasNext()) {
      /**
       * Array may be matched by either
       * a@name: Array bound to name
       * a(...): Array pattern
       */
      switch(peek()) {
        case '@':
          parseBinding(node);
          return;
        case '(':
          parseArrayList(node);
          break;
        default:
          /**
           * Allow patterns like a(a) to match nested arrays without
           * binding them to names.
           */
          return;
      }

      /**
       * Check if the rest of the array
       * is matched against.
       */
      if(peek() === '|') {
        consume();
        rest = newNode('rest', node.nodes);
        /**
         * Check if the rest argument is bound
         * to a name.
         */
        clear();
        if(peek() === '@') {
          parseBinding(rest);
          clear();
        }
      }

      /**
       * Ensure that the array pattern is correctly
       * terminated (with a closing parentheses).
       */
      if(peek() !== ')') {
        unexpectedTokenException(')');
      } else {
        consume(); // ')'
        /**
         * The array pattern might be bound to a name.
         */
        if(hasNext() && peek() === '@') {
          parseBinding(node);
        }
      }
    }
  }
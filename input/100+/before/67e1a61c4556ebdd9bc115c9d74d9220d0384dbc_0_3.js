function parseObject(AST) {
    consume(); // 'o'

    var node = newNode('object', AST);

    if(hasNext()) {
     /**
       * An object may be matched by either
       * o@name: Object bound to name
       * o(...): Object pattern
       */
      switch(peek()) {
        case '@':
          parseBinding(node);
          return;
        case '(':
          parseProperties(node);
          break;
        default:
          /**
           * Allow patterns like a(o) to match nested objects without
           * binding them to names.
           */
          return;
      }

     /**
       * Ensure that the object pattern is correctly
       * terminated (with a closing parentheses).
       */
      if(!match(')')) {
        throw "Unexpected token at index " + index + " expected: ')'";
      } else {
        /**
         * The array pattern might be bound to a name.
         */
        if(hasNext() && peek() === '@') {
          parseBinding(node);
        }
      }
    }
  }
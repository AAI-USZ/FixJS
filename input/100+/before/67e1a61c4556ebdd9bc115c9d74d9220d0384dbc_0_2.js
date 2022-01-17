function parseProperty(node) {
    consume(); // '.'
    var name = [], property;

    while(validChar(peek())) {
      name.push(next());
    }

    name = name.join('');

    if(name.length > 0) {
      property = newNode('property', node.nodes);
      property.name = name;

      /**
       * Properties may have type specifiers. This is the way to go
       * to match nested objects.
       *
       * e.g. 'o(.coord:o(.x, .y))' matches objects like
       *  '{coord: {x: 5, y: 7} }'
       */
      if(hasNext() && peek() === ':') {
        consume();
        stage1(property.nodes);
      }

      /**
       * A property may of course have a binding.
       */
      if(hasNext() && peek() === '@') {
        parseBinding(property);
      }
    } else {
      throw "No property name given at " + index + " for " + node.type;
    }
  }
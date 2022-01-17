function parseBooleanLiteral(AST) {
    var literal = [], node;

    function isLowerCase(c) {
      var code = c.charCodeAt(0);
      return code >= 97 && code <= 122;
    }

    while(hasNext() && isLowerCase(peek())) {
      literal.push(next());
    }

    literal = literal.join('');
    if(literal === 'true' || literal === 'false') {
      node = newNode('equals', AST);
      newNode(literal[0] === 't' ? true : false, node.nodes);
    } else {
        unexpectedTokenException('boolean');
    }
  }
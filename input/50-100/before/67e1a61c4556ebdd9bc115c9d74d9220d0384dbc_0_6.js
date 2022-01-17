function parseNumericLiteral(AST) {
    var literal = [], node, value;

    while(hasNext() && validNum(peek())) {
      literal.push(next());
    }

    value = parseFloat(literal.join(''));

    /**
     * Thanks to CMS's answer on StackOverflow:
     * http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
     */
    if(!isNaN(value) && isFinite(value)) {
      node = newNode('equals', AST);
      newNode(value, node.nodes);
    } else {
      throw "Unexpected token "
        + peek()
        + " where numeric was expected";
    }
  }
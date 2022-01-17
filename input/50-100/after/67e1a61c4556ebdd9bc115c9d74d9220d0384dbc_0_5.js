function parseStringLiteral(AST) {
    var literal = [], node, enclosing = next();

    if(!(enclosing === '"' || enclosing === "'")) {
      throw "Unexpected token at index " + index
        + " expected 'string' but found " + enclosing;
    }

    while(hasNext() && peek() !== enclosing) {
      literal.push(next());
    }

    consume(); // ' or "
    node = newNode('equals', AST);
    newNode(literal.join(''), node.nodes);
  }
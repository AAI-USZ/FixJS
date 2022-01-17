function parseStringLiteral(AST) {
    var literal = [], node, enclosing = next();

    if(!(enclosing === '"' || enclosing === "'")) {
      throw "Unexpected token "
        + enclosing
        + " where string was expected";
    }

    while(hasNext() && peek() !== enclosing) {
      literal.push(next());
    }

    consume(); // ' or "
    node = newNode('equals', AST);
    newNode(literal.join(''), node.nodes);
  }
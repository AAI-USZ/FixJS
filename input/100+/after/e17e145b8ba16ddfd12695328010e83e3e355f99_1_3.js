function resolve(identifier, o) {
    if (identifier.variable && identifier.variable.type instanceof Types.ArrowType
       && o.functionStrMap[identifier.name]) {
      var strId = new Identifier(o.functionStrMap[identifier.name]);
      return new SequenceExpression([
        new AssignmentExpression(
          identifier, "=",
          new CallExpression(
            new Identifier("stub"),
            [strId, identifier]
          )
        ),
        new AssignmentExpression(
          strId, "=",
          new Identifier("null")
        ),
        identifier
      ]);
    } else {
      return identifier;
    }
  }
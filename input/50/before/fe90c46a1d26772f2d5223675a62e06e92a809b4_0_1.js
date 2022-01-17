function createRequire(name) {
    return new CallExpression(new Identifier("require"), [new Literal("./" + name)]);
  }
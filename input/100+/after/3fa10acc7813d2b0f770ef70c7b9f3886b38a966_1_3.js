function (o) {
    var scope = o.scope = this.frame;
    o.externs = Object.create(null);

    logger.push(this);
    passOverList(this.body, 'externPass', o);
    logger.pop();

    var variableDeclaration, variableDeclarators = [];
    for (var name in o.externs) {
      variableDeclarators.push(new VariableDeclarator(o.externs[name], null));
      scope.addVariable(new Variable(name), true);
      logger.info("Adding extern " + name);
    }

    if (variableDeclarators.length > 0) {
      variableDeclaration = new VariableDeclaration("extern", variableDeclarators);
      this.body.unshift(variableDeclaration);
    }

    return this;
  }
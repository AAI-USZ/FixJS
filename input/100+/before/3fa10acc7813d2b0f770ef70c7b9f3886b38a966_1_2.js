function (o) {
    logger = o.logger;
    logger.push(this);
    o = extend(o);

    o.variables = Object.create(null);

    passOverList(this.body, 'jsRewrite', o);

    var variableDeclaration, variableDeclarators = [];
    for (var name in o.variables) {
      variableDeclarators.push(new VariableDeclarator(o.variables[name], null));
    }

    if (variableDeclarators.length > 0) {
      variableDeclaration = new VariableDeclaration("let", variableDeclarators);
      this.elements.unshift(variableDeclaration);
    }

    logger.pop();
    return this;
  }
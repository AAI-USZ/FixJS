function (o) {
    logger.push(this);

    o = extend(o);
    o.variables = Object.create(null);

    this.body = this.body.jsRewrite(o);

    var variableDeclaration, variableDeclarators = [];
    for (var name in o.variables) {
      variableDeclarators.push(new VariableDeclarator(o.variables[name], null));
    }

    if (variableDeclarators.length > 0) {
      variableDeclaration = new VariableDeclaration("let", variableDeclarators);
      if (this.body instanceof BlockStatement) {
        this.body.body.unshift(variableDeclaration);
      } else {
        this.body = new BlockStatement([variableDeclaration, this.body]);
      }
    }

    logger.pop();
    return this;
  }
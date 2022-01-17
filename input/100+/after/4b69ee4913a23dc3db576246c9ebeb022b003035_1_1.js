function (o) {
    logger = o.logger;
    logger.push(this);
    o = extend(o);

    o.functions = Object.create(null);
    o.variables = Object.create(null);

    this.body = passOverList(this.body, 'jsRewrite', o);

    var name;

    var variableDeclaration, variableDeclarators = [];
    for (name in o.variables) {
      // Do not insert a declaration if we know name should be a predefined global
      if (!externs[name] && !o.functions[name]) {
        variableDeclarators.push(new VariableDeclarator(o.variables[name], null, null, null, o.variables[name].loc));
      }
    }

    if (variableDeclarators.length > 0) {
      variableDeclaration = new VariableDeclaration("let", variableDeclarators);
      this.body.unshift(variableDeclaration);
    }

    for (name in o.functions) {
      this.body.unshift(o.functions[name]);
    }

    logger.pop();
    return this;
  }
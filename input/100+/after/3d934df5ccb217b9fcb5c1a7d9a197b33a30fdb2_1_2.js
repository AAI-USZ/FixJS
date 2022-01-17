function (o) {
    logger.push(this);

    o = extend(o);
    o.variables = Object.create(null);

    this.body = this.body.jsRewrite(o);

    var inParams, variableDeclaration, variableDeclarators = [];
    for (var name in o.variables) {
      inParams = false;
      for (var i = 0, l = this.params.length; i < l; i++) {
        if (name === this.params[i].name) {
          inParams = true;
        }
      }
      if (!inParams) {
        variableDeclarators.push(new VariableDeclarator(o.variables[name], null, null, null, o.variables[name].loc));
      }
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
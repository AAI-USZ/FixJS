function (o) {
    var childOpts = extend(o);
    childOpts.scope = this.frame;
    childOpts.laziness = new Laziness();
    this.body = this.body.lazyParsePass(childOpts);

    var strId, strDeclaration;
    for (var name in childOpts.laziness.functionStrings) {
      strId = new Identifier(name, "variable");
      strDeclaration = new VariableDeclaration(
        "var",
        [new VariableDeclarator(strId, new Literal(childOpts.laziness.functionStrings[name]), undefined)]
      );
      prepend(strDeclaration, this.body);
    }

    if (childOpts.laziness.needsStub) {
      prepend(stubConstructor(), this.body);
    }
    if (childOpts.laziness.needsStubF) {
      print("Can optimize constructor");
      prepend(stubFConstructor(), this.body);
    }



    if (this instanceof FunctionDeclaration) {
      var functionString = escodegen.generate(this, {format: {indent: { style: '', base: 0}}});
      if (functionString.length > o.options["lazy-minimum"]) {
        if (this.id instanceof Identifier && this.params) {
          for (var i = 0, l = this.params.length; i < l; i++) {
            var param = this.params[i];
            if (param instanceof Identifier && this.id.name === param.name) {
              return this;
            }
          }
        }

        var id = o.scope.freshTemp();
        if (childOpts.laziness.isClosure) {
          o.laziness.functionStrings[id.name] = '(' + functionString + ')';
          this.body = stub(this.id, id.name, "stub", this.params);
          o.laziness.needsStub = true;
        } else {
          functionString = escodegen.generate(this.body, {format: {indent: { style: '', base: 0}}});
          o.laziness.functionStrings[id.name] = functionString;
          this.body = stub(this.id, id.name, "stubF", this.params);
          o.laziness.needsStubF = true;
        }

        o.laziness.functionMap[this.id.name] = {mangled: id.name, isClosure: childOpts.laziness.isClosure, params: this.params};
      }
      return this;
    } else {
      this.isClosure = childOpts.laziness.isClosure;
      return this;
    }
  }
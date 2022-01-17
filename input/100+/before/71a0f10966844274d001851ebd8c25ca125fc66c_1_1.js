function (o) {
    var childO = extend(o);
    childO.scope = this.frame;
    childO.functionStrings = Object.create(null);
    childO.functionStrMap = Object.create(null);
    this.body = this.body.lazyParsePass(childO);

    var strId, strDeclaration, addedVars = false;
    for (var name in childO.functionStrings) {
      strId = new Identifier(name, "variable");
      strDeclaration = new VariableDeclaration(
        "var",
        [new VariableDeclarator(strId, new Literal(childO.functionStrings[name]), undefined)]
      );
      prepend(strDeclaration, this.body);
      addedVars = true;
    }
    if (addedVars) {
      prepend(stubConstructor(), this.body);
    }


    if (this instanceof FunctionDeclaration) {
      if (this.id instanceof Identifier && this.params) {
        for (var i = 0, l = this.params.length; i < l; i++) {
          var param = this.params[i];
          if (param instanceof Identifier && this.id.name === param.name) {
            return this;
          }
        }
      }
      var id = o.scope.freshTemp();
      o.functionStrMap[this.id.name] = id.name;
      var functionString = escodegen.generate(this, {format: {indent: { style: '', base: 0}}});

      if (functionString.length > o.options["lazy-minimum"]) {
        //print('compressing function ' + id.name);
        o.functionStrings[id.name] = '(' + functionString + ')';
        this.body = stub(this.id, id.name, this.params);
      }
      return this;
    } else {
      return this;
    }
  }
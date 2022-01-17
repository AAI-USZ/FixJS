function (o) {
    o.scope = this.frame;
    o = extend(o);
    o.laziness = new Laziness();

    this.body = passOverList(this.body, 'lazyParsePass', o);

    var strId, strDeclaration;
    for (var name in o.laziness.functionStrings) {
      strId = new Identifier(name, "variable");
      strDeclaration = new VariableDeclaration(
        "var",
        [new VariableDeclarator(strId, new Literal(o.laziness.functionStrings[name]), undefined)]
      );
      this.body.unshift(strDeclaration);
    }

    if (o.laziness.needsStub) {
      this.body.unshift(stubConstructor());
    }
    if (o.laziness.needsStubF) {
      print("Can optimize constructor");
      this.body.unshift(stubFConstructor());
    }


    return this;
  }
function (o) {
    o.scope = this.frame;
    o = extend(o);
    o.laziness = {
      functionStrings: Object.create(null),
      functionMap: Object.create(null),
      isClosure: false
    };

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

    var needsStub = false, needsStubF = false;
    for (var name in o.laziness.functionMap) {
      if (o.laziness.functionMap[name].isClosure) {
        needsStub = true;
      } else {
        needsStubF = true;
      }
      if (needsStub && needsStubF) {
        break;
      }
    }

    if (needsStub) {
      this.body.unshift(stubConstructor());
    }
    if (needsStubF) {
      print("Can optimize constructor");
      this.body.unshift(stubFConstructor());
    }


    return this;
  }
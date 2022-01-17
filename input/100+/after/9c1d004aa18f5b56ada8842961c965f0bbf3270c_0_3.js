function (o) {
    if (this.right instanceof FunctionExpression) {
      var functionString = escodegen.generate(this.right, {format: {indent: { style: '', base: 0}}});
      if (functionString.length > o.options["lazy-minimum"]) {
        var id = o.scope.freshTemp();

        if (this.left instanceof Identifier && this.params) {
          for (var i = 0, l = this.params.length; i < l; i++) {
            var param = this.params[i];
            if (param instanceof Identifier && this.left.name === param.name) {
              return this;
            }
          }
        }
        //print('compressing function ' + id.name);

        if (this.right.isClosure) {
          o.laziness.functionStrings[id.name] = '(' + functionString + ')';
          this.right.body = stub(this.left, id.name, "stub", this.right.params);
        } else {
          o.laziness.functionStrings[id.name] = escodegen.generate(this.right.body, {format: {indent: { style: '', base: 0}}});
          this.right.body = stub(this.left, id.name, "stubF", this.right.params);
        }

        var funcName;
        if (this.left instanceof Identifier) {
          funcName = this.left.name;
        } else {
          funcName = id.name;
        }
        o.laziness.functionMap[funcName] = {mangled: id.name, isClosure: this.right.isClosure, params: this.right.params};
      }
    }
    // else if (this.right instanceof Identifier) {
    //   this.right = resolve(this.right, o);
    // }

    return this;
  }
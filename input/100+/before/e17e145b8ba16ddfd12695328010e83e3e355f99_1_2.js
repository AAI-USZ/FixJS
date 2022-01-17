function (o) {
    if (this.right instanceof FunctionExpression) {
      var id = o.scope.freshTemp();
      if (this.left instanceof Identifier) {
        o.functionStrMap[this.left.name] = id.name;
      }
      var functionString = escodegen.generate(this.right, {format: {indent: { style: '', base: 0}}});

      if (functionString.length > o.options["lazy-minimum"]) {
        if (this.left instanceof Identifier && this.params) {
          for (var i = 0, l = this.params.length; i < l; i++) {
            var param = this.params[i];
            if (param instanceof Identifier && this.left.name === param.name) {
              return this;
            }
          }
        }
        //print('compressing function ' + id.name);
        o.functionStrings[id.name] = '(' + functionString + ')';
        this.right.body = stub(this.left, id.name, this.right.params);
      }
    }
    // else if (this.right instanceof Identifier) {
    //   this.right = resolve(this.right, o);
    // }

    return this;
  }
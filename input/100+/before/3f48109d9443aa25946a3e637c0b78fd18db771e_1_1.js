function stubConstructor() {
    var tempId = new Identifier("t");
    var strId = new Identifier("s");
    return new FunctionDeclaration(
      new Identifier("stub"),
      [new Identifier("s"), new Identifier("f")],
      new BlockStatement([
        new IfStatement(
          new BinaryExpression(
            "===",
            new UnaryExpression(
              "typeof",
              strId
            ),
            new Literal("string")
          ),
          new BlockStatement([
            new VariableDeclaration(
              "var", [
                new VariableDeclarator(
                  tempId,
                  new CallExpression(
                    new Identifier("eval"),
                    [strId]
                  )
                )
              ]
            ),
            new ExpressionStatement(
              new AssignmentExpression(
                new MemberExpression(
                  tempId,
                  new Identifier("prototype"),
                  false,
                  "."
                ),
                "=",
                new MemberExpression(
                  new Identifier("f"),
                  new Identifier("prototype"),
                  false,
                  "."
                )
              )
            ),
            new ForInStatement(
              new VariableDeclaration(
                "var", [
                  new VariableDeclarator(
                    new Identifier("x")
                  )
                ]
              ),
              new Identifier("f"),
              new BlockStatement([
                new ExpressionStatement(
                  new AssignmentExpression(
                    new MemberExpression(
                      tempId,
                      new Identifier("x"),
                      true
                    ), "=",
                    new MemberExpression(
                      new Identifier("f"),
                      new Identifier("x"),
                      true
                    )
                  )
                )
              ])
            ),
            new ReturnStatement(
              tempId
            )
          ])
        ),
        new ReturnStatement(
          new Identifier("f")
        )
      ])
    );
  }
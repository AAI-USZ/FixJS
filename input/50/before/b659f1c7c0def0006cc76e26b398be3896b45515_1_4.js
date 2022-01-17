function genFunExpr(id, args, body) { return Pattern({ type: "FunctionExpression",
                                              id: id,
                                              params: args,
                                              body: body
                                              }) }
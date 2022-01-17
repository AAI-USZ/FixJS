function funExpr(id, args, body, gen) { return Pattern({ type: "FunctionExpression",
                                                id: id,
                                                params: args,
                                                body: body,
                                                generator: false,
                                                }) }
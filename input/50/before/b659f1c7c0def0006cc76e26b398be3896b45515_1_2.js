function genFunDecl(id, params, body) { return Pattern({ type: "FunctionDeclaration",
                                                id: id,
                                                params: params,
                                                body: body
                                                }) }
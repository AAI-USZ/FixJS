function funDecl(id, params, body) { return Pattern({ type: "FunctionDeclaration",
                                             id: id,
                                             params: params,
                                             body: body,
                                             generator: false
                                             }) }
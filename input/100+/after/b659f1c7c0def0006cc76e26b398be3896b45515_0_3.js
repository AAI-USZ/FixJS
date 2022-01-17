function parseObjectProperty() {
        var token, key, id, param;

        token = lookahead();

        if (token.type === Token.Identifier) {

            id = parseObjectPropertyKey();

            // Property Assignment: Getter and Setter.

            if (token.value === 'get' && !(match(':') || match('('))) {
                key = parseObjectPropertyKey();
                expect('(');
                expect(')');
                return {
                    type: Syntax.Property,
                    key: key,
                    value: parsePropertyFunction([], { generator: false }),
                    kind: 'get'
                };
            } else if (token.value === 'set' && !(match(':') || match('('))) {
                key = parseObjectPropertyKey();
                expect('(');
                token = lookahead();
                if (token.type !== Token.Identifier) {
                    throwUnexpected(lex());
                }
                param = [ parseVariableIdentifier() ];
                expect(')');
                return {
                    type: Syntax.Property,
                    key: key,
                    value: parsePropertyFunction(param, { generator: false, name: token }),
                    kind: 'set'
                };
            } else {
                if (match(':')) {
                    lex();
                    return {
                        type: Syntax.Property,
                        key: id,
                        value: parseAssignmentExpression(),
                        kind: 'init'
                    };
                } else if (match('(')) {
                    return {
                        type: Syntax.Property,
                        key: id,
                        value: parsePropertyMethodFunction({ generator: false }),
                        kind: 'init',
                        method: true
                    };
                } else {
                    return {
                        type: Syntax.Property,
                        key: id,
                        value: id,
                        kind: 'init',
                        shorthand: true
                    };
                }
            }
        } else if (token.type === Token.EOF || token.type === Token.Punctuator) {
            if (!match('*')) {
                throwUnexpected(token);
            }
            lex();

            id = parseObjectPropertyKey();

            if (!match('(')) {
                throwUnexpected(lex());
            }

            return {
                type: Syntax.Property,
                key: id,
                value: parsePropertyMethodFunction({ generator: true }),
                kind: 'init',
                method: true
            };
        } else {
            key = parseObjectPropertyKey();
            if (match(':')) {
                lex();
                return {
                    type: Syntax.Property,
                    key: key,
                    value: parseAssignmentExpression(),
                    kind: 'init'
                };
            } else if (match('(')) {
                return {
                    type: Syntax.Property,
                    key: key,
                    value: parsePropertyMethodFunction({ generator: false }),
                    kind: 'init',
                    method: true
                };
            } else {
                return {
                    type: Syntax.Property,
                    key: key,
                    value: key,
                    kind: 'init',
                    shorthand: true
                };
            }
        }
    }
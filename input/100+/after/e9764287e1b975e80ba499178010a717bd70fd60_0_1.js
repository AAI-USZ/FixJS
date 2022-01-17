function parseMethodDefinition() {
        var token, key, result, param;

        token = lookahead();
        key = parseObjectPropertyKey();

        if (token.value === 'get' && !match('(')) {
            key = parseObjectPropertyKey();
            expect('(');
            expect(')');
            return {
                type: Syntax.MethodDefinition,
                key: key,
                value: parsePropertyFunction([], { generator: false }),
                kind: 'get'
            };
        } else if (token.value === 'set' && !match('(')) {
            key = parseObjectPropertyKey();
            expect('(');
            token = lookahead();
            if (token.type !== Token.Identifier) {
                throwUnexpected(lex());
            }
            param = [ parseVariableIdentifier() ];
            expect(')');
            return {
                type: Syntax.MethodDefinition,
                key: key,
                value: parsePropertyFunction(param, token),
                kind: 'set'
            };
        } else {
            return {
                type: Syntax.MethodDefinition,
                key: key,
                value: parsePropertyMethodFunction({ generator: false }),
                kind: ''
            };
        }
    }
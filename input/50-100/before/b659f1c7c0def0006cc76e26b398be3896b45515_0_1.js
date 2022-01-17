function parseArrowFunctionExpression(param) {
        var previousStrict, body;

        expect('=>');

        previousStrict = strict;
        strict = true;
        body = parseConciseBody();
        strict = previousStrict;

        return {
            type: Syntax.ArrowFunctionExpression,
            id: null,
            params: param,
            body: body
        };
    }
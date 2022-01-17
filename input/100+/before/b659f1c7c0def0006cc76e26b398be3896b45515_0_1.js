function parsePropertyFunction(param, first) {
        var previousStrict, body;

        previousStrict = strict;
        body = parseConciseBody();
        if (first && strict && isRestrictedWord(param[0].name)) {
            throwError(first, Messages.StrictParamName);
        }
        strict = previousStrict;

        return {
            type: Syntax.FunctionExpression,
            id: null,
            params: param,
            body: body
        };
    }
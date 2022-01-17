function parsePropertyFunction(param, options) {
        var previousStrict, previousYieldAllowed, body;

        previousStrict = strict;
        previousYieldAllowed = yieldAllowed;
        yieldAllowed = options.generator;
        body = parseConciseBody();
        if (options.name && strict && isRestrictedWord(param[0].name)) {
            throwError(options.name, Messages.StrictParamName);
        }
        strict = previousStrict;
        yieldAllowed = previousYieldAllowed;

        return {
            type: Syntax.FunctionExpression,
            id: null,
            params: param,
            body: body,
            generator: options.generator
        };
    }
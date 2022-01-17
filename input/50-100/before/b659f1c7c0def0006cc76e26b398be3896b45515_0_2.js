function parseYieldExpression() {
        var delegate;

        expectKeyword('yield');

        if (!state.inFunctionBody) {
            throwErrorTolerant({}, Messages.IllegalYield);
        }

        delegate = false;
        if (match('*')) {
            lex();
            delegate = true;
        }

        return {
            type: Syntax.YieldExpression,
            argument: parseAssignmentExpression(),
            delegate: delegate
        };
    }
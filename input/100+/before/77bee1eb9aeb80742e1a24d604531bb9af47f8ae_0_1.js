function parseRelationalExpression() {
        var expr, previousAllowIn;

        previousAllowIn = state.allowIn;
        state.allowIn = true;
        expr = parseShiftExpression();
        state.allowIn = previousAllowIn;

        if (match('<') || match('>') || match('<=') || match('>=')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseRelationalExpression()
            };
        } else if (state.allowIn && matchKeyword('in')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: 'in',
                left: expr,
                right: parseRelationalExpression()
            };
        } else if (matchKeyword('instanceof')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: 'instanceof',
                left: expr,
                right: parseRelationalExpression()
            };
        }

        return expr;
    }
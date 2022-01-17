function parseLogicalANDExpression() {
        var expr = parseBitwiseXORExpression();

        while (match('&&')) {
            lex();
            expr = {
                type: Syntax.LogicalExpression,
                operator: '&&',
                left: expr,
                right: parseBitwiseXORExpression()
            };
        }

        return expr;
    }
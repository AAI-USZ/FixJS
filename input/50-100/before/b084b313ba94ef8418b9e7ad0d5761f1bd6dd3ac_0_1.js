function parseBitwiseORExpression() {
        var expr = parseBitwiseANDExpression();

        while (match('|')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: '|',
                left: expr,
                right: parseBitwiseANDExpression()
            };
        }

        return expr;
    }
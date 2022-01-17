function parseAssignmentExpression() {
        var expr;

        expr = parseConditionalExpression();

        if (matchAssign()) {
            // LeftHandSideExpression
            if (state.lastParenthesized !== expr && !isLeftHandSide(expr)) {
                throwError({}, Messages.InvalidLHSInAssignment);
            }

            // 11.13.1
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwError({}, Messages.StrictLHSAssignment);
            }

            expr = {
                type: Syntax.AssignmentExpression,
                operator: lex().value,
                left: expr,
                right: parseAssignmentExpression()
            };
        }

        return expr;
    }
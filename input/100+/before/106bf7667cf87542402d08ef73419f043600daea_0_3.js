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

            // ES.next draf 11.13 Runtime Semantics step 1
            if (expr.type === Syntax.ObjectExpression || expr.type === Syntax.ArrayExpression) {
                reinterpretAsAssignmentBindingPattern(expr);
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
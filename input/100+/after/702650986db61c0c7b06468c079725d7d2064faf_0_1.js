function parseAssignmentExpression() {
        var expr, oldParenthesizedCount, coverFormalsList;

        if (matchKeyword('yield')) {
            return parseYieldExpression();
        }

        oldParenthesizedCount = state.parenthesizedCount;

        expr = parseConditionalExpression();

        if (match('=>')) {
            if (expr.type === Syntax.Identifier) {
                if (state.parenthesizedCount === oldParenthesizedCount || state.parenthesizedCount === (oldParenthesizedCount + 1)) {
                    if (isRestrictedWord(expr.name)) {
                        throwError({}, Messages.StrictParamName);
                    }
                    return parseArrowFunctionExpression([ expr ]);
                }
            } else if (expr.type === Syntax.SequenceExpression) {
                if (state.parenthesizedCount === (oldParenthesizedCount + 1)) {
                    coverFormalsList = reinterpretAsCoverFormalsList(expr);
                    if (coverFormalsList) {
                        return parseArrowFunctionExpression(coverFormalsList);
                    }
                }
            }
        }

        if (matchAssign()) {
            // 11.13.1
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwError({}, Messages.StrictLHSAssignment);
            }

            // ES.next draf 11.13 Runtime Semantics step 1
            if (match('=') && (expr.type === Syntax.ObjectExpression || expr.type === Syntax.ArrayExpression)) {
                reinterpretAsAssignmentBindingPattern(expr);
            } else if (!isLeftHandSide(expr)) {
                throwError({}, Messages.InvalidLHSInAssignment);
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
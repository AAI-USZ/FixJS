function reinterpretAsCoverFormalsList(expr) {
        var i, len, param, paramSet;
        assert(expr.type === Syntax.SequenceExpression);

        paramSet = {};

        for (i = 0, len = expr.expressions.length; i < len; i += 1) {
            param = expr.expressions[i];
            if (param.type !== Syntax.Identifier) {
                return null;
            }
            if (isRestrictedWord(param.name)) {
                throwError({}, Messages.StrictParamName);
            }
            if (Object.prototype.hasOwnProperty.call(paramSet, param.name)) {
                throwError({}, Messages.StrictParamDupe);
            }
            paramSet[param.name] = true;
        }
        return expr.expressions;
    }
function(expr) {
    var command = expr[0];
    if (macros[command]) {
        expr = macroExpand(expr);
        return handleExpression(expr);
    }
    if (_.isString(command)) {
        if (keywords[command])
            return keywords[command](expr);

        for (var prefix in readers) {
          if (command.indexOf(prefix) === 0)
            return readers[prefix](expr);
        }
    }
    handleSubExpressions(expr);
    var fName = expr[0];
    if (!fName) throw handleError(1, expr._line);
    if (isFunction.test(fName)) fName = "(" + fName + ")";
    return fName + "(" + expr.slice(1).join(",") + ")";
}
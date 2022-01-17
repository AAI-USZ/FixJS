f{
    // Make sure there is actually something to complete at the end.
    if (expr.length === 0)
        return true;

    if (reJSChar.test(expr[expr.length-1]) ||
            expr[expr.length-1] === ".")
    {
        // An expression at the end - we're fine.
    }
    else
    {
        var lastBr = expr.lastIndexOf("[");
        if (lastBr !== -1 && /^" *$/.test(expr.substr(lastBr+1)) &&
            origExpr.charAt(lastBr+1) !== "/")
        {
            // Array completions - we're fine.
        }
        else {
            return true;
        }
    }

    // Check for 'function i'.
    var ind = expr.lastIndexOf(" ");
    if (isValidProperty(expr.substr(ind+1)) && isFunctionName(expr, ind+1))
        return true;

    // Check for '{prop: ..., i'.
    var bwp = bwFindMatchingParen(expr, expr.length);
    if (bwp !== -1 && expr.charAt(bwp) === "{" &&
            isObjectDecl(expr, bwp) && isCommaProp(expr, bwp+1))
    {
        return true;
    }

    // Check for 'var prop..., i'.
    var vind = expr.lastIndexOf("var ");
    if (bwp < vind && isCommaProp(expr, vind+4))
    {
        // Note: This doesn't strictly work, because it kills completions even
        // when we have started a new expression and used the comma operator
        // in it (ie. 'var a; a, i'). This happens very seldom though, so it's
        // not really a problem.
        return true;
    }

    // Check for 'function f(i'.
    while (bwp !== -1 && expr.charAt(bwp) !== "(")
    {
        bwp = bwFindMatchingParen(expr, bwp);
    }
    if (bwp !== -1)
    {
        var ind = prevNonWs(expr, bwp);
        if (ind !== -1 && reJSChar.test(expr.charAt(ind)))
        {
            var stw = prevWord(expr, ind);
            if (expr.substring(stw, ind+1) === "function")
                return true;
            if (isFunctionName(expr, stw))
                return true;
        }
    }
    return false;
}

f{
    var kwCont = ["function", "if", "while", "for", "switch", "catch", "with"];

    var ind = prevNonWs(expr, expr.length), ch = (ind === -1 ? "{" : expr.charAt(ind));
    if (reJSChar.test(ch))
    {
        // Test if the previous word is a keyword usable like 'kw <expr>'.
        // If so, we have a regex, otherwise, we have a division (a variable
        // or literal being divided by something).
        var w = expr.substring(prevWord(expr, ind), ind+1);
        return (kwActions.indexOf(w) !== -1 || w === "do" || w === "else");
    }
    else if (ch === ")")
    {
        // We have a regex in the cases 'if (...) /blah/' and 'function name(...) /blah/'.
        ind = bwFindMatchingParen(expr, ind);
        if (ind === -1)
            return null;
        ind = prevNonWs(expr, ind);
        if (ind === -1)
            return false;
        if (!reJSChar.test(expr.charAt(ind)))
            return false;
        var wind = prevWord(expr, ind);
        if (kwCont.indexOf(expr.substring(wind, ind+1)) !== -1)
            return true;
        return isFunctionName(expr, wind);
    }
    else if (ch === "]")
    {
        return false;
    }
    return true;
}

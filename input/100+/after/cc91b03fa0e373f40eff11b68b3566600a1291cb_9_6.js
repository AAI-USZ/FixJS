function isObjectDecl(expr, pos)
{
    var ind = prevNonWs(expr, pos);
    if (ind === -1)
        return false;
    var ch = expr.charAt(ind);
    if (ch === ")" || ch === "{" || ch === "}" || ch === ";")
        return false;
    if (!reJSChar.test(ch))
        return true;
    var w = expr.substring(prevWord(expr, ind), ind+1);
    return (kwActions.indexOf(w) !== -1);
}
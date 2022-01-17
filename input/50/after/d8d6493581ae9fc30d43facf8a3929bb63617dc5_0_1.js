function strReplace(strs, strr, str)
{
    var expresion = eval("/" + strs + "/g");

    return str.replace(expresion, strr);
}
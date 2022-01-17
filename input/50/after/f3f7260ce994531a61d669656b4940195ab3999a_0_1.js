function stringReplace(strSearch, stringReplace, str)
{
    var expression = eval("/" + strSearch + "/g");

    return str.replace(expression, stringReplace);
}
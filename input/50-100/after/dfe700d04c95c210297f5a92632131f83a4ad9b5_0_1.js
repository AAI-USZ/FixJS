function LEMcountif()
{
    // takes variable number of arguments - returns count of those arguments that match the first parameter
    var result=0;
    var match=arguments[0];
    for (i=1;i<arguments.length;++i) {
        var arg = arguments[i];
        if (arg == match) {
            ++result;
        }
    }
    return result;
}
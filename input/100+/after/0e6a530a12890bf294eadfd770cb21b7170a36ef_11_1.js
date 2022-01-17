function addEntityMapToList(ccode, entity)
{
    var lists = Array.slice(arguments, 2),
        len = lists.length,
        ch = String.fromCharCode(ccode);

    for (var i = 0; i < len; i++)
    {
        var list = lists[i];
        normal[list]=normal[list] || {};
        normal[list][ch] = "&" + entity + ";";
        reverse[list]=reverse[list] || {};
        reverse[list]["&" + entity + ";"] = ch;
    }
}
function getWatchRowIndex(row)
{
    var index = -1;
    for (; row && Css.hasClass(row, "watchRow"); row = row.previousSibling)
        ++index;
    return index;
}
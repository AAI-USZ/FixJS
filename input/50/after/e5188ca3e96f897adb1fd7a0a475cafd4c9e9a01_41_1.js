function getWatchRowIndex(row)
{
    var index = -1;
    for (; row; row = row.previousSibling)
    {
        if (Css.hasClass(row, "watchRow"))
            ++index;
    }
    return index;
}
function move(to, from)
{
    var selected = $(from);
    var pool = $(to);
    while (pool.selectedIndex != -1)
    {
        selected.appendChild(pool.options.item(pool.selectedIndex))
    }
}
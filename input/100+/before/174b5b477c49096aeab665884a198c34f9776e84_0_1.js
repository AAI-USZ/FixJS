function initCells()
{
    for (i = fillCellIndex; i < totalCells; ++i)
    {
        var nextRow = (i / numColums)|0;

        if (i != (nextRow * numColums))
        {
            $('#matrix').find($('td:eq(' + i + ')')).removeClass("valueShown");
            $('#matrix').find($('td:eq(' + i + ')')).addClass("valueHidden");
        }
    }
}
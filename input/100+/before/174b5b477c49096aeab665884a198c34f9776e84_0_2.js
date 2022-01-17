function completeAlignment()
{
    for (i = fillCellIndex; i < totalCells; ++i)
    {
        var nextRow = (i / numColums)|0;

        if (i != (nextRow * numColums))
        {
            $('#matrix').find($('td:eq(' + i + ')')).removeClass("valueHidden");
            $('#matrix').find($('td:eq(' + i + ')')).addClass("valueShown");
        }
        
        highlightCalculationRelevantCells();
    }

    initIndexes();

    // Demo of coloring calculation-relevant table-cells for visualisation
    // instead of using tooltips
    /*
    if(fillCellIndex > 2*numColums)
    {
        $('#matrix').find($('td:eq(' + (fillCellIndex+1) + ')')).css('background-color', '#006699');
        $('#matrix').find($('td:eq(' + (fillCellIndex-numColums+1) + ')')).css('background-color', '#CC3333');
        $('#matrix').find($('td:eq(' + (fillCellIndex-numColums) + ')')).css('background-color', '#CC3333');
    }
    */
}
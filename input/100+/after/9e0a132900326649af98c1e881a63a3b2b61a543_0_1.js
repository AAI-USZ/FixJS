function completeBacktrack()
{
    getScoreAndCellIndex();
    
    var currentBacktrackCellIndex = scoreCellIndex;
    var currentRow = ((currentBacktrackCellIndex/numColums)|0)-1;
    
    $('#matrix').find($('td:eq(' + (currentBacktrackCellIndex) + ')')).css('background-color', '#CC0000');    
    $('#matrix').find($('td:eq(' + (currentBacktrackCellIndex) + ')')).css('color', '#FFFFFF');
    
    while(currentRow > 1)
    {
        var topLeftIndex = currentBacktrackCellIndex-numColums-1;
        var topIndex     = currentBacktrackCellIndex-numColums;
        var leftIndex    = currentBacktrackCellIndex-1;

        var topLeftCellValue = $('#matrix').find($('td:eq(' + topLeftIndex + ')')).html();
        var topCellValue     = $('#matrix').find($('td:eq(' + topIndex + ')')).html(); 
        var leftCellValue    = $('#matrix').find($('td:eq(' + leftIndex + ')')).html(); 

        var tmpMax   = topLeftCellValue;
        var maxIndex = topLeftIndex;

        //alert("1 topCellValue: " + topCellValue + " tmpMax: " + tmpMax + " (topCellValue|0 > tmpMax|0)= " + ((topCellValue|0) > (tmpMax|0)) );
        if((topCellValue|0) > (tmpMax|0)) 
        {
            maxIndex = topIndex;
            tmpMax   = topCellValue;
            //alert("2 tmpMax: " + tmpMax + " maxIndex: " + maxIndex + " topCellValue: " + topCellValue);
        }
        if((leftCellValue|0) > (tmpMax|0)) 
        {
            maxIndex = leftIndex;
            //alert("3 tmpMax: " + tmpMax + " maxIndex: " + maxIndex + " leftCellValue: " + leftCellValue);
        }
        
        if((currentBacktrackCellIndex%numColums) == 1) {
            return;
        }

        $('#matrix').find($('td:eq(' + maxIndex + ')')).css('background-color', '#66FF33');
        
        currentBacktrackCellIndex = maxIndex;
        currentRow = ((currentBacktrackCellIndex/numColums)|0)-1;
    }

}
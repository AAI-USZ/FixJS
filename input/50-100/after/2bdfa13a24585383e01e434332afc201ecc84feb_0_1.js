function getScoreAndCellIndex()
{
    completeAlignment();
    score = $('#score').html();
    
    for(i = numColums; i < totalCells; ++i)
    {
        if($('#matrix').find($('td:eq(' + (i) + ')')).html() === score)
        {
            scoreCellIndex = i;
        }
    }
}
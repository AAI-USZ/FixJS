function autoplay()
{
    initIndexes();
    var tmp = fillCellIndex;
    while(tmp <= (totalCells-1)) 
    {   
        setTimeout(nextStepCalc(), 1000);        
        ++tmp;
    }
}
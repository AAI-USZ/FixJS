function(amount)
{
    var stageMovedX = game_.match_.deltaX_;
    if(!!stageMovedX)
    {
        /*ensure the directions are the opposite*/
        amount = 0.5 * (Math.abs(amount) * (Math.abs(stageMovedX) / stageMovedX));
        this.MoveX(amount);
    }

}
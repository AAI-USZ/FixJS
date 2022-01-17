function(player,frame)
{
    if(!this.isRoundOver_)
    {
        this.isRoundOver_ = true;
        this.GetGame().SetSpeed(CONSTANTS.NORMAL_SPEED);
        this.gotoNewRoundFrame_ = frame;

        announcer_.EndRound();
    }
}
function(dontMoveOtherPlayers)
{
    if(this.IsExecutingSuperMove())
        this.SetZOrder(16);
    else
        this.SetZOrder(14);

    if(!dontMoveOtherPlayers)
        this.moveOtherPlayersToBackFn_();
}
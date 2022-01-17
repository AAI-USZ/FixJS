function(dontMoveOtherPlayers)
{
    this.SetZOrder(3);
    if(!dontMoveOtherPlayers)
        this.moveOtherPlayersToBackFn_();
}
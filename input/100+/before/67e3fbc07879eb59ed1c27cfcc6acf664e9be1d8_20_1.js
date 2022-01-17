function()
{
    var match = this.GetMatch();

    for(var i = 0, length = match.GetTeamA().GetPlayers().length; i < length; ++i)
        match.GetTeamA().GetPlayer(i).AlignX(this.deltaX_);
    for(var i = 0, length = match.GetTeamB().GetPlayers().length; i < length; ++i)
        match.GetTeamB().GetPlayer(i).AlignX(this.deltaX_);
}
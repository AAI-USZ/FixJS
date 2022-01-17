function()
{
    var match = this.GetMatch();

    for(var i = 0, length = match.TeamA.GetPlayers().length; i < length; ++i)
        match.TeamA.GetPlayer(i).AlignX(this.deltaX_);
    for(var i = 0, length = match.TeamB.GetPlayers().length; i < length; ++i)
        match.TeamB.GetPlayer(i).AlignX(this.deltaX_);
}
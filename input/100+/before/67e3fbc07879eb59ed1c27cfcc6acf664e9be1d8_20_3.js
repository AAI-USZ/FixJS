function ()
{
    var flag = true;
    var match = this.GetMatch();
    for(var i = 0; i < match.GetTeamA().GetPlayers().length; ++i)
    {
        if(match.GetTeamA().GetPlayer(i).GetX() == STAGE.MIN_X)
        {
            if(!flag) return false;
            flag = false;
        }
    }
    for(var i = 0; i < match.GetTeamB().GetPlayers().length; ++i)
    {
        if(match.GetTeamB().GetPlayer(i).GetX() == STAGE.MIN_X)
        {
            if(!flag) return false;
            flag = false;
        }
    }

    return true;
}
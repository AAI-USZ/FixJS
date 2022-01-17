function ()
{
    var flag = true;
    var match = this.GetMatch();
    for(var i = 0; i < match.TeamA.GetPlayers().length; ++i)
    {
        if(match.TeamA.GetPlayer(i).GetX() == STAGE.MIN_X)
        {
            if(!flag) return false;
            flag = false;
        }
    }
    for(var i = 0; i < match.TeamB.GetPlayers().length; ++i)
    {
        if(match.TeamB.GetPlayer(i).GetX() == STAGE.MIN_X)
        {
            if(!flag) return false;
            flag = false;
        }
    }

    return true;
}
function()
    {
        var match = GetMatch_();

        var minX = STAGE.MAX_STAGEX;
        var retVal = null;
        for(var i = 0, length = match.GetTeamA().GetPlayers().length; i < length; ++i)
        {
            if(match.GetTeamA().GetPlayer(i).GetLeftX() < minX)
            {
                minX = match.GetTeamA().GetPlayer(i).GetLeftX();
                retVal = match.GetTeamA().GetPlayer(i);
            }
        }
        for(var i = 0, length = match.GetTeamB().GetPlayers().length; i < length; ++i)
        {
            if(match.GetTeamB().GetPlayer(i).GetLeftX() < minX)
            {
                minX = match.GetTeamB().GetPlayer(i).GetLeftX();
                retVal = match.GetTeamB().GetPlayer(i);
            }
        }

        return retVal;
    }
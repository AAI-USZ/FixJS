function()
    {
        var match = GetMatch_();

        var maxX = STAGE.MIN_STAGEX;
        var retVal = null;

        var tALength = match.TeamA.GetPlayers().length;
        var tBLength = match.TeamB.GetPlayers().length;

        if(!tALength || !tBLength)
            return null;

        for(var i = 0; i < tALength; ++i)
        {
            if(match.TeamA.GetPlayer(i).GetLeftX() > maxX)
            {
                maxX = match.TeamA.GetPlayer(i).GetLeftX();
                retVal = match.TeamA.GetPlayer(i);
            }
        }
        for(var i = 0; i < tBLength; ++i)
        {
            if(match.TeamB.GetPlayer(i).GetLeftX() > maxX)
            {
                maxX = match.TeamB.GetPlayer(i).GetLeftX();
                retVal = match.TeamB.GetPlayer(i);
            }
        }

        return retVal;
    }
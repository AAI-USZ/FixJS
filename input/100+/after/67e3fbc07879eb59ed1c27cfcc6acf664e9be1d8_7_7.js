function(x,team)
    {
        var match = GetMatch_();
        switch(team)
        {
            case CONSTANTS.TEAM1:
            {
                var nbPlayers = match.TeamB.GetPlayers().length;
                if(nbPlayers == 0)
                    return null;
                for(var i = 0; i < nbPlayers; ++i)
                    if(match.TeamB.GetPlayer(i).GetMidX() < x)
                        return true;
                break;
            }
            case CONSTANTS.TEAM2:
            {
                var nbPlayers = match.TeamA.GetPlayers().length;
                if(nbPlayers == 0)
                    return null;
                for(var i = 0; i < nbPlayers; ++i)
                    if(match.TeamA.GetPlayer(i).GetMidX() < x)
                        return true;
                break;
            }
        }
        return false;
    }
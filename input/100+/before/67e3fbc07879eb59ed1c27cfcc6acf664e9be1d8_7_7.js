function(x,team)
    {
        var match = GetMatch_();
        switch(team)
        {
            case CONSTANTS.TEAM1:
            {
                for(var i = 0; i < match.GetTeamB().GetPlayers().length; ++i)
                    if(match.GetTeamB().GetPlayer(i).GetMidX() < x)
                        return true;
                break;
            }
            case CONSTANTS.TEAM2:
            {
                for(var i = 0; i < match.GetTeamA().GetPlayers().length; ++i)
                    if(match.GetTeamA().GetPlayer(i).GetMidX() < x)
                        return true;
                break;
            }
        }
        return false;
    }
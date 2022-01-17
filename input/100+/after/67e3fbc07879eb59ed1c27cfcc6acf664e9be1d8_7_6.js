function(team,x,y,distance,airborneFlags,isAirborne)
    {
        var match = GetMatch_();
        switch(team)
        {
            case CONSTANTS.TEAM1:
            {
                for(var i = 0, length = match.TeamB.GetPlayers().length; i < length; ++i)
                    if(match.TeamB.GetPlayer(i).CanBeGrappled(x,y,distance,airborneFlags,isAirborne))
                        return match.TeamB.GetPlayer(i);
                break;
            }
            case CONSTANTS.TEAM2:
            {
                for(var i = 0, length = match.TeamA.GetPlayers().length; i < length; ++i)
                    if(match.TeamA.GetPlayer(i).CanBeGrappled(x,y,distance,airborneFlags,isAirborne))
                        return match.TeamA.GetPlayer(i);
                break;
            }
        }
        return null;
    }
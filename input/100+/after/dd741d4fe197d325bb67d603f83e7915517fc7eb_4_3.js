function(team,x,y,distance,airborneFlags,isAirborne)
    {
        var match = GetMatch_();
        switch(team)
        {
            case CONSTANTS.TEAM1:
            {
                for(var i = 0; i < match.teamB_.Players.length; ++i)
                    if(match.teamB_.Players[i].CanBeGrappled(x,y,distance,airborneFlags,isAirborne))
                        return match.teamB_.Players[i];
                break;
            }
            case CONSTANTS.TEAM2:
            {
                for(var i = 0; i < match.teamA_.Players.length; ++i)
                    if(match.teamA_.Players[i].CanBeGrappled(x,y,distance,airborneFlags,isAirborne))
                        return match.teamA_.Players[i];
                break;
            }
        }
        return null;
    }
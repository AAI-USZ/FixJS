function(team,x,y,distance,airborneFlags,isAirborne)
    {
        var match = GetMatch_();
        switch(team)
        {
            case CONSTANTS.TEAM1:
            {
                for(var i = 0; i < match.GetTeamB().GetPlayers().length; ++i)
                    if(match.GetTeamB().GetPlayer(i).CanBeGrappled(x,y,distance,airborneFlags,isAirborne))
                        return match.GetTeamB().GetPlayer(i);
                break;
            }
            case CONSTANTS.TEAM2:
            {
                for(var i = 0; i < match.GetTeamA().GetPlayers().length; ++i)
                    if(match.GetTeamA().GetPlayer(i).CanBeGrappled(x,y,distance,airborneFlags,isAirborne))
                        return match.GetTeamA().GetPlayer(i);
                break;
            }
        }
        return null;
    }
function(team,x,y,distance,mustBeAirborne)
    {
        var match = GetMatch_();
        switch(team)
        {
            case CONSTANTS.TEAM1:
            {
                for(var i = 0; i < match.teamB_.Players.length; ++i)
                    if((Math.abs(x - match.teamB_.Players[i].GetMidX()) < distance)
                        && (Math.abs(y - match.teamB_.Players[i].y_) < distance)
                        && (!(match.teamB_.Players[i].flags_.Player.Has(PLAYER_FLAGS.INVULNERABLE)))
                        && ((mustBeAirborne === null)
                            || (mustBeAirborne == (match.teamB_.Players[i].IsAirborne())))
                        && (!match.teamB_.Players[i].grappledPlayer_
                        && (!match.teamB_.Players[i].currentAnimation_.Animation.moveOverrideFlags_.HasOverrideFlag(OVERRIDE_FLAGS.THROW)))
                        && (!match.teamB_.Players[i].HasRegisteredHit())
                        )
                        return true;
                break;
            }
            case CONSTANTS.TEAM2:
            {
                for(var i = 0; i < match.teamA_.Players.length; ++i)
                    if((Math.abs(x - match.teamA_.Players[i].GetMidX()) < distance)
                        && (Math.abs(y - match.teamA_.Players[i].y_) < distance)
                        && (!(match.teamA_.Players[i].flags_.Player.Has(PLAYER_FLAGS.INVULNERABLE)))
                        && ((mustBeAirborne === null)
                            || (mustBeAirborne == (match.teamA_.Players[i].IsAirborne())))
                        && (!match.teamA_.Players[i].grappledPlayer_)
                        && (!match.teamA_.Players[i].currentAnimation_.Animation.moveOverrideFlags_.HasOverrideFlag(OVERRIDE_FLAGS.THROW))
                        && (!match.teamA_.Players[i].HasRegisteredHit())
                        )
                        return true;
                break;
            }
        }
        return false;
    }
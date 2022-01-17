function(team, changeAmount)
    {
        switch(team)
        {
            case CONSTANTS.TEAM1: {this.GetTeamA().GetHealthbar().Change(changeAmount); break; }
            case CONSTANTS.TEAM2: {this.GetTeamB().GetHealthbar().Change(changeAmount); break; }
        };
    }
function(team, changeAmount)
    {
        switch(team)
        {
            case CONSTANTS.TEAM1: {this.TeamA.GetHealthbar().Change(changeAmount); break; }
            case CONSTANTS.TEAM2: {this.TeamB.GetHealthbar().Change(changeAmount); break; }
        };
    }
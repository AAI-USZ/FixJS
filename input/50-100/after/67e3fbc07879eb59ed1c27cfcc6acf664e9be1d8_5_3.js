function(team, changeAmount)
    {
        switch(team)
        {
            case CONSTANTS.TEAM1: {this.TeamA.GetEnergybar().Change(changeAmount); break; }
            case CONSTANTS.TEAM2: {this.TeamB.GetEnergybar().Change(changeAmount); break; }
        };
    }
function(team, changeAmount)
    {
        switch(team)
        {
            case CONSTANTS.TEAM1: {this.GetTeamA().GetEnergybar().Change(changeAmount); break; }
            case CONSTANTS.TEAM2: {this.GetTeamB().GetEnergybar().Change(changeAmount); break; }
        };
    }
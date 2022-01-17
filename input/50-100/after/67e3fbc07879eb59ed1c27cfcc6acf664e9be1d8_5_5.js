function(team)
    {
        switch(team)
        {
            case CONSTANTS.TEAM1: {return this.TeamA.GetEnergybar().GetAmount();}
            case CONSTANTS.TEAM2: {return this.TeamB.GetEnergybar().GetAmount();}
        }
    }
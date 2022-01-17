function(team)
    {
        switch(team)
        {
            case CONSTANTS.TEAM1: {return this.GetTeamA().GetEnergybar().GetAmount();}
            case CONSTANTS.TEAM2: {return this.GetTeamB().GetEnergybar().GetAmount();}
        }
    }
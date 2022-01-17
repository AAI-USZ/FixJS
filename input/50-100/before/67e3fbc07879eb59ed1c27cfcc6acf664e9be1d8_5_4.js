function(team)
    {
        switch(team)
        {
            case CONSTANTS.TEAM1: {return this.GetTeamA().GetHealthbar().GetAmount();}
            case CONSTANTS.TEAM2: {return this.GetTeamB().GetHealthbar().GetAmount();}
        }
    }
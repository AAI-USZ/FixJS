function(team)
    {
        switch(team)
        {
            case CONSTANTS.TEAM1: {return this.TeamA.GetHealthbar().GetAmount();}
            case CONSTANTS.TEAM2: {return this.TeamB.GetHealthbar().GetAmount();}
        }
    }
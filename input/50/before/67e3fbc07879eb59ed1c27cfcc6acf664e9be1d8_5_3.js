function()
    {
        if(this.GetPlayerCount())
            this.SetPlayerCount(this.GetTeamA().GetPlayers().length + this.GetTeamB().GetPlayers().length);

        return this.GetPlayerCount();
        
    }
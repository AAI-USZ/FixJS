function()
    {
        if(this.GetPlayerCount())
            this.SetPlayerCount(this.TeamA.GetPlayers().length + this.TeamB.GetPlayers().length);

        return this.GetPlayerCount();
        
    }
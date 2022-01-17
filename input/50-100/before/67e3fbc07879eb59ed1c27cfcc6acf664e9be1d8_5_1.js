function()
    {
        for(var i = 0; i < this.GetTeamA().GetPlayers().length; ++i)
            this.GetTeamA().GetPlayer(i).ClearInput();
        for(var i = 0; i < this.GetTeamB().GetPlayers().length; ++i)
            this.GetTeamB().GetPlayer(i).ClearInput();
    }
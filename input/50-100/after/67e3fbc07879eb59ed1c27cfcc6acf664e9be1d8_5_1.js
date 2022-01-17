function()
    {
        for(var i = 0; i < this.TeamA.GetPlayers().length; ++i)
            this.TeamA.GetPlayer(i).ClearInput();
        for(var i = 0; i < this.TeamB.GetPlayers().length; ++i)
            this.TeamB.GetPlayer(i).ClearInput();
    }
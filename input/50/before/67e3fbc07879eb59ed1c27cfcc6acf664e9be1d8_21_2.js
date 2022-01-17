function()
    {
        for(var i = 0; i < this.GetPlayers().length; ++i)
            this.GetPlayer(i).Pause();
    }
function()
    {
        for(var i = 0, length = nbPlayers_; i < length; ++i)
            this.GetPlayer(i).Resume();
    }
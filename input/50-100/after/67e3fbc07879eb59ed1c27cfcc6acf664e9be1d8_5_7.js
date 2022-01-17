function(frame)
    {
        for(var i = 0; i < this.TeamA.GetPlayers().length; ++i)
            this.TeamA.GetPlayer(i).OnRenderComplete(frame);
        for(var i = 0; i < this.TeamB.GetPlayers().length; ++i)
            this.TeamB.GetPlayer(i).OnRenderComplete(frame);
    }
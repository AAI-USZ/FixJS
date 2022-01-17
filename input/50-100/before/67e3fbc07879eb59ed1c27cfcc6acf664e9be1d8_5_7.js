function(frame)
    {
        for(var i = 0; i < this.GetTeamA().GetPlayers().length; ++i)
            this.GetTeamA().GetPlayer(i).OnRenderComplete(frame);
        for(var i = 0; i < this.GetTeamB().GetPlayers().length; ++i)
            this.GetTeamB().GetPlayer(i).OnRenderComplete(frame);
    }
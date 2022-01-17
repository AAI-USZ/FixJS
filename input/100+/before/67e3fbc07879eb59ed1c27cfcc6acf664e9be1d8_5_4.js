function(isDown,keyCode,frame)
    {
        if(this.GetAllowInput())
        {
            for(var i = 0; i < this.GetTeamA().GetPlayers().length; ++i)
                this.GetTeamA().GetPlayer(i).OnKeyStateChanged(isDown,keyCode,frame);
            for(var i = 0; i < this.GetTeamB().GetPlayers().length; ++i)
                this.GetTeamB().GetPlayer(i).OnKeyStateChanged(isDown,keyCode,frame);
        }
    }
function(isDown,keyCode,frame)
    {
        if(this.GetAllowInput())
        {
            for(var i = 0; i < this.TeamA.GetPlayers().length; ++i)
                this.TeamA.GetPlayer(i).OnKeyStateChanged(isDown,keyCode,frame);
            for(var i = 0; i < this.TeamB.GetPlayers().length; ++i)
                this.TeamB.GetPlayer(i).OnKeyStateChanged(isDown,keyCode,frame);
        }
    }
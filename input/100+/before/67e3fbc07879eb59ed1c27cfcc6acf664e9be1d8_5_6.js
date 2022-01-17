function(player)
    {
        if(this.IsSuperMoveActive())
        {
            this.SetBackgroundTransparent();
            for(var i = 0; i < this.GetTeamA().GetPlayers().length; ++i)
                if(this.GetTeamA().GetPlayer(i).id_ != player.id_)
                    this.GetTeamA().GetPlayer(i).OnSuperMoveCompleted();
            for(var i = 0; i < this.GetTeamB().GetPlayers().length; ++i)
                if(this.GetTeamB().GetPlayer(i).id_ != player.id_)
                    this.GetTeamB().GetPlayer(i).OnSuperMoveCompleted();
            this.SetSuperMoveActive(false);
        }
    }
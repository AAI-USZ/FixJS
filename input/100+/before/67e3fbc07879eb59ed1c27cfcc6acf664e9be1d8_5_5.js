function(player)
    {
        if(!this.IsSuperMoveActive())
        {
            this.SetBackgroundTransparent(player);
            this.SetSuperMoveActive(true);
            for(var i = 0; i < this.GetTeamA().GetPlayers().length; ++i)
                if(this.GetTeamA().GetPlayer(i).id_ != player.id_)
                    this.GetTeamA().GetPlayer(i).OnSuperMoveStarted();
            for(var i = 0; i < this.GetTeamB().GetPlayers().length; ++i)
                if(this.GetTeamB().GetPlayer(i).id_ != player.id_)
                    this.GetTeamB().GetPlayer(i).OnSuperMoveStarted();
        }
    }
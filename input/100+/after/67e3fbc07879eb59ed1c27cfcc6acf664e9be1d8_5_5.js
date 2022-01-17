function(player)
    {
        if(!this.IsSuperMoveActive())
        {
            this.SetBackgroundTransparent(player);
            this.SetSuperMoveActive(true);
            for(var i = 0; i < this.TeamA.GetPlayers().length; ++i)
                if(this.TeamA.GetPlayer(i).id_ != player.id_)
                    this.TeamA.GetPlayer(i).OnSuperMoveStarted();
            for(var i = 0; i < this.TeamB.GetPlayers().length; ++i)
                if(this.TeamB.GetPlayer(i).id_ != player.id_)
                    this.TeamB.GetPlayer(i).OnSuperMoveStarted();
        }
    }
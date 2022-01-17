function(team,attackDirection,loseIgnoreId)
    {
        announcer_.KO();
        this.ReleaseAllInput();

        this.SetAllowInput(false);
        var frame = this.GetGame().GetCurrentFrame();
        this.GetGame().SetSpeed(CONSTANTS.SLOW_SPEED);
        this.SetDefeatedTeam(team);
        switch(this.GetDefeatedTeam())
        {
            case CONSTANTS.TEAM1:
            {
                for(var i = 0; i < this.GetTeamA().GetPlayers().length; ++i)
                    if(this.GetTeamA().GetPlayer(i).id_ != loseIgnoreId)
                        this.GetTeamA().GetPlayer(i).ForceLose(attackDirection);
                for(var i = 0; i < this.GetTeamB().GetPlayers().length; ++i)
                    this.GetTeamB().GetPlayer(i).JustWon(frame);
                break;
            }
            case CONSTANTS.TEAM2:
            {
                for(var i = 0; i < this.GetTeamB().GetPlayers().length; ++i)
                    if(this.GetTeamB().GetPlayer(i).id_ != loseIgnoreId)
                        this.GetTeamB().GetPlayer(i).ForceLose(attackDirection);
                for(var i = 0; i < this.GetTeamA().GetPlayers().length; ++i)
                    this.GetTeamA().GetPlayer(i).JustWon(frame);
                break;
            }
        }
    }
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
                for(var i = 0; i < this.TeamA.GetPlayers().length; ++i)
                    if(this.TeamA.GetPlayer(i).id_ != loseIgnoreId)
                        this.TeamA.GetPlayer(i).ForceLose(attackDirection);
                for(var i = 0; i < this.TeamB.GetPlayers().length; ++i)
                    this.TeamB.GetPlayer(i).JustWon(frame);
                break;
            }
            case CONSTANTS.TEAM2:
            {
                for(var i = 0; i < this.TeamB.GetPlayers().length; ++i)
                    if(this.TeamB.GetPlayer(i).id_ != loseIgnoreId)
                        this.TeamB.GetPlayer(i).ForceLose(attackDirection);
                for(var i = 0; i < this.TeamA.GetPlayers().length; ++i)
                    this.TeamA.GetPlayer(i).JustWon(frame);
                break;
            }
        }
    }
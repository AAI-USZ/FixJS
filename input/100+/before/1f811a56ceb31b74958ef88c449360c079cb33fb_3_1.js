function(team,attackDirection,loseIgnoreId)
{
    announcer_.KO();
    this.ReleaseAllInput();

    this.allowInput_ = false;
    var frame = this.GetGame().frame_;
    this.GetGame().SetSpeed(CONSTANTS.SLOW_SPEED);
    this.defeatedTeam_ = team;
    switch(this.defeatedTeam_)
    {
        case CONSTANTS.TEAM1:
        {
            for(var i = 0; i < this.teamA_.Players.length; ++i)
                if(this.teamA_.Players[i].id_ != loseIgnoreId)
                    this.teamA_.Players[i].ForceLose(attackDirection);
            for(var i = 0; i < this.teamB_.Players.length; ++i)
                this.teamB_.Players[i].JustWon(frame);
            break;
        }
        case CONSTANTS.TEAM2:
        {
            for(var i = 0; i < this.teamB_.Players.length; ++i)
                if(this.teamB_.Players[i].id_ != loseIgnoreId)
                    this.teamB_.Players[i].ForceLose(attackDirection);
            for(var i = 0; i < this.teamA_.Players.length; ++i)
                this.teamA_.Players[i].JustWon(frame);
            break;
        }
    }
}
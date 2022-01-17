function()
{
    for(var i = 0; i < this.teamA_.Players.length; ++i)
        this.teamA_.Players[i].ClearInput();
    for(var i = 0; i < this.teamB_.Players.length; ++i)
        this.teamB_.Players[i].ClearInput();
}
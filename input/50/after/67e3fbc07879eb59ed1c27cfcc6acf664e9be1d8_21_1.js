function(value)
    {
        players_ = value;
        this.SetPlayerIndexes();
        nbPlayers_ = players_.length;
    }
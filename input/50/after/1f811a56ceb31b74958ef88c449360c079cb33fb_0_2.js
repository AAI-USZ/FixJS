function()
    {
        if(!!game_.GetMatch())
            return game_.GetMatch().teamB_.Players[0];
        return null;
    }
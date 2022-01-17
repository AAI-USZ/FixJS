function()
    {
        if(!!game_.GetMatch())
            return game_.GetMatch().teamA_.Players[0];
        return null;
    }
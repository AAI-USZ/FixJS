function()
    {
        if(!!game_.GetMatch())
            return game_.GetMatch().teamA_.Players[0].ClearInput();
        return null;
    }
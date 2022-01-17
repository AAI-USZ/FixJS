function()
    {
        if(!!game_.GetMatch())
            return game_.GetMatch().teamB_.Players[0].ClearInput();
        return null;
    }
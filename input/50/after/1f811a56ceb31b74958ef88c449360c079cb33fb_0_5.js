function(input)
    {
        if(!!game_.GetMatch())
            return game_.GetMatch().teamA_.Players[0].SendInput(input);
        return null;
    }
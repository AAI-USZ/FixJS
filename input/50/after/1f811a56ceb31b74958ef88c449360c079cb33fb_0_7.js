function(input)
    {
        if(!!game_.GetMatch())
            return game_.GetMatch().teamB_.Players[0].SendInput(input);
        return null;
    }
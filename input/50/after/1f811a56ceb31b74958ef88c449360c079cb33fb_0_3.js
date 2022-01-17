function(index)
    {
        if(!!game_.GetMatch())
            return game_.GetMatch().teamA_.Players[index || 0];
        return null;
    }
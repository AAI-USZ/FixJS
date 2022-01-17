function(index)
    {
        if(!!game_.GetMatch())
            return game_.GetMatch().teamB_.Players[index || 0];
        return null;
    }
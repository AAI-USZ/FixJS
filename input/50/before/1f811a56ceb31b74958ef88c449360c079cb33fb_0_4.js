function(index)
    {
        if(!!game_.match_)
            return game_.match_.teamB_.Players[index || 0];
        return null;
    }
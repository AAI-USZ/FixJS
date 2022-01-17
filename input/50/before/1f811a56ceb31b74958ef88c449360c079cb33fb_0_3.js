function(index)
    {
        if(!!game_.match_)
            return game_.match_.teamA_.Players[index || 0];
        return null;
    }
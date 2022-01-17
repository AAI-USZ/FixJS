function(input)
    {
        if(!!game_.match_)
            return game_.match_.teamB_.Players[0].SendInput(input);
        return null;
    }
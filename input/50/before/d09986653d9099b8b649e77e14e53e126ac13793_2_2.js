function(nbRemaining)
    {
        if(!nbRemaining)
            pnlLoading_.innerHTML = "Done loading";
        else
            pnlLoading_.innerHTML = "Loading (" + nbRemaining + ")";
    }
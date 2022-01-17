function(nbRemaining)
    {
        if(!nbRemaining)
            pnlLoading_.innerHTML = "done";
        else
            pnlLoading_.innerHTML = nbRemaining;
    }
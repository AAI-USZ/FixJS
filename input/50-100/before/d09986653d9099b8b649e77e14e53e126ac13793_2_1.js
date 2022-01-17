function(show)
    {
        if(!!show)
            pnlLoadingProgress_.style.display = "";
        else
        {
            pnlLoadingProgress_.style.display = "none";
            pnlLoading_.innerHTML = "";
        }
    }
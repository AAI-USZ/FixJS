function(show)
    {
        if(!!show)
        {
            pnlLoadingProgress_.style.display = "";
            pnlLoading_.className = "loading";
        }
        else
        {
            pnlLoadingProgress_.style.display = "none";
            pnlLoading_.innerHTML = "done";
            pnlLoading_.className = "done-loading";
        }
    }
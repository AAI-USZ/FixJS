function()
    {
        this.GetPortriatImg().style.display = "none";
        this.GetNameImg().style.display = "none";
        this.GetComboText().HideNow();
        this.GetHealthbar().Release();
        this.GetEnergybar().Release();
        for(var i = 0; i < this.GetPlayers().length; ++i)
            this.GetPlayer(i).Release();
        this.SetCursor(0);
    }
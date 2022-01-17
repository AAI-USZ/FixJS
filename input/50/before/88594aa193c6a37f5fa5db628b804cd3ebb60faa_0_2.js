function(scrollTop, dividersTop)
    {
        this._dividersElement.style.top = scrollTop + "px";
        this._eventDividersElement.style.top = scrollTop + "px";
        this._dividersLabelBarElement.style.top = dividersTop + "px";
    }
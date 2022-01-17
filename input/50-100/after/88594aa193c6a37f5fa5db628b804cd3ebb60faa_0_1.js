function(dividers)
    {
        this._gridHeaderElement.removeChild(this._eventDividersElement);
        for (var i = 0; i < dividers.length; ++i) {
            if (dividers[i])
                this._eventDividersElement.appendChild(dividers[i]);
        }
        this._gridHeaderElement.appendChild(this._eventDividersElement);
    }
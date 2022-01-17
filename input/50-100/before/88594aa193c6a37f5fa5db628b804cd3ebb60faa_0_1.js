function(dividers)
    {
        this.element.removeChild(this._eventDividersElement);
        for (var i = 0; i < dividers.length; ++i) {
            if (dividers[i])
                this._eventDividersElement.appendChild(dividers[i]);
        }
        this.element.appendChild(this._eventDividersElement);
    }
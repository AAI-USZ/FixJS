function(visible)
    {
        if (visible)
            this._searchItemElement.addStyleClass("with-navigation-buttons");
        else
            this._searchItemElement.removeStyleClass("with-navigation-buttons");
    }
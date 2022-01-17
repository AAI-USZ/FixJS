function(enabled)
    {
        if (enabled) {
            this._searchNavigationPrevElement.removeStyleClass("hidden");
            this._searchNavigationNextElement.removeStyleClass("hidden");
        } else {
            this._searchNavigationPrevElement.addStyleClass("hidden");
            this._searchNavigationNextElement.addStyleClass("hidden");
        }
    }
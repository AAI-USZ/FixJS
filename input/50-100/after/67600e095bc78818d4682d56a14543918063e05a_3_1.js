function(callback)
    {
        if (this._content || this._contentLoaded) {
            callback(this._content, false, this._mimeType);
            return;
        }
        this._requestContentCallbacks.push(callback);
        if (this._requestContentCallbacks.length === 1)
            this._contentProvider.requestContent(this.fireContentAvailable.bind(this));
    }
function() {
        this.placesManager.disconnect(this._bookmarksId);
        this.placesManager.disconnect(this._mountsId);

        this.parent();
    }
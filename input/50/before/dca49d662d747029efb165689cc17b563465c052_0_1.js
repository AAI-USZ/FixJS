function() {
        Main.placesManager.disconnect(this._bookmarksId);
        Main.placesManager.disconnect(this._mountsId);

        this.parent();
    }
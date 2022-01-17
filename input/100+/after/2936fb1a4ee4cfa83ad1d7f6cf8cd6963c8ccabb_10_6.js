function (enabled) {
        // Already enabled?
        if (enabled && this._contentScaleFactor == 2) {
            return true;
        }

        // Already diabled?
        if (!enabled && this._contentScaleFactor == 1) {
            return false;
        }

        // setContentScaleFactor is not supported
        if (!this._openGLView.canSetContentScaleFactor()) {
            return false;
        }

        // SD device
        if (this._openGLView.getMainScreenScale() == 1.0) {
            return false;
        }

        var newScale = (enabled) ? 2 : 1;
        this.setContentScaleFactor(newScale);

        this._createStatsLabel();
        return true;
    }
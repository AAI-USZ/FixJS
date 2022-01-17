function() {

        if(OPAQUE_BACKGROUND && (this._autohideStatus || OPAQUE_BACKGROUND_ALWAYS)){
            this._backgroundBox.show();
            this._fadeInBackground(ANIMATION_TIME, 0);
        }
        else if(!OPAQUE_BACKGROUND || (!this._autohideStatus && !OPAQUE_BACKGROUND_ALWAYS)) {
            this._fadeOutBackground(ANIMATION_TIME, 0);
        }
    }
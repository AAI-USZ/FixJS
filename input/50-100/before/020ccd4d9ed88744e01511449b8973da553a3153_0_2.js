function() {
        if(this._autohide==true){
            this._autohide = false;
            this._removeAnimations();
            this._animateIn(ANIMATION_TIME, 0);
            if(OPAQUE_BACKGROUND && !OPAQUE_BACKGROUND_ALWAYS)
                this._fadeOutBackground(ANIMATION_TIME, 0);
            // If this loop exists clear it since it's no more necessary
            if(this._dashShowTimeout>0)
            Mainloop.source_remove(this._dashShowTimeout);
        }
    }
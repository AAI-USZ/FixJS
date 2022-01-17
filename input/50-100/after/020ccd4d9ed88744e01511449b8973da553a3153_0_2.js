function() {
        if(this._autohideStatus==true){
            this._autohideStatus = false;

            // clear unnecesssary potentially running loops
            if(this._dashShowTimeout>0)
                Mainloop.source_remove(this._dashShowTimeout);

            this._removeAnimations();
            this._animateIn(ANIMATION_TIME, 0);
            if(OPAQUE_BACKGROUND && !OPAQUE_BACKGROUND_ALWAYS)
                this._fadeOutBackground(ANIMATION_TIME, 0);
        }
    }
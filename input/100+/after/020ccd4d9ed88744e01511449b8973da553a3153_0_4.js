function() {
        if(this._autohideStatus==false){

            let delay=0; // immediately fadein background if hide is blocked by mouseover,
                         // oterwise start fadein when dock is already hidden.
            this._autohideStatus = true;
            this._removeAnimations();

            if(this.actor.hover==true)
                this.actor.sync_hover();

            if( !this.actor.hover || !AUTOHIDE) {
                this._animateOut(ANIMATION_TIME, 0);
                delay = ANIMATION_TIME;
            } else if (AUTOHIDE ) {
                // I'm enabling autohide and the dash keeps being showed because of mouse hover
                // so i start the loop usualy started by _show()
                this._startDashShowLoop();

                delay = 0;
            }
            
            if(OPAQUE_BACKGROUND && ! OPAQUE_BACKGROUND_ALWAYS)
                this._fadeInBackground(ANIMATION_TIME, delay);
        }
    }
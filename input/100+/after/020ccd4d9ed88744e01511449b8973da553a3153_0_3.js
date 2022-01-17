function() {

        if(_DEBUG_) global.log("hide " + anim.showing() + " " + anim.hiding() +
                            " " + anim.shown() + " " + anim.hidden());

        var anim = this._animStatus;

        // If no hiding animation is running or queued
        if( this._autohideStatus && (anim.showing() || anim.shown()) ){

            let delay;

            // If a show is queued but still not started (i.e the mouse was 
            // over the screen  border but then went away, i.e not a sufficient 
            // amount of time is passeed to trigger the dock showing) remove it.
            if( anim.showing()) {
                if(anim.running){
                    //if a show already started, let it finish; queue hide without removing the show.
                    // to obtain this I increase the delay to avoid the overlap and interference 
                    // between the animations
                    delay = HIDE_DELAY + 2*ANIMATION_TIME + SHOW_DELAY;

                } else {
                    this._removeAnimations();
                    delay = 0;
                }
            } else if( anim.shown() ) {
                delay = HIDE_DELAY;
            }

            this._animateOut(ANIMATION_TIME, delay);

            // Clear dashShow Loop
            if(this._dashShowTimeout>0)
                Mainloop.source_remove(this._dashShowTimeout);
        }
    }
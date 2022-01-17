function() {  

        var anim = this._animStatus;

        if(_DEBUG_) global.log("show " + anim.showing() + " " + anim.hiding() +
                                " " + anim.shown() + " " + anim.hidden());

        if( this._autohideStatus && ( anim.hidden() || anim.hiding() ) ){

            let delay;
            // If the dock is hidden, wait SHOW_DELAY before showing it; 
            // otherwise show it immediately.
            if(anim.hidden()){
                delay = SHOW_DELAY;
            } else if(anim.hiding()){
                // suppress all potential queued hiding animations (always give priority to show)
                this._removeAnimations();
                delay = 0;
            }

            this._animateIn(ANIMATION_TIME, delay);

            // Ensure dash is hidden after closing icon menu if necessary
            this._startDashShowLoop();
        }
    }
function(event) {
            if (that.is(event.target)) {
                that.removeClass('transitionSettings').css(vendor + 'TransitionProperty', 'none');
                that.off('webkitTransitionEnd'); 
                if(typeof callback == 'function') callback();
            }
        }
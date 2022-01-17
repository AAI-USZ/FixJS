function(transform, callback) {
        var that = this,
            transProp = '-' + vendor.toLowerCase() + '-transform';
        
        var onComp = function(event) {
            if (that.is(event.target)) {
                that.removeClass('transitionSettings').css(vendor + 'TransitionProperty', 'none');
                that.off('webkitTransitionEnd'); 
                if(typeof callback == 'function') callback();
            }
        };
        this.off('webkitTransitionEnd').on('webkitTransitionEnd', onComp);
        
        this.addClass('transitionSettings').css('visibility', 'visible');

        setTimeout(function() {
            that.css(vendor + 'TransitionProperty', transProp).css(vendor + 'Transform', transform); 
        }, 10);
    }
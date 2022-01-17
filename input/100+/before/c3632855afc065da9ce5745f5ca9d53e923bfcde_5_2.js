function(transform, callback) {
        var that = this,
            transProp = '-' + vendor.toLowerCase() + '-transform';
        
        var onComp = function(event) {
            if (that.is(event.target)) {
                that.removeClass('transitionSettings').css(vendor + 'TransitionProperty', 'none');
                that.unbind('webkitTransitionEnd'); 
                if(typeof callback == 'function') callback();
            }
        };
        this.unbind('webkitTransitionEnd').bind('webkitTransitionEnd', onComp);
        
        this.addClass('transitionSettings').css('visibility', 'visible');

        setTimeout(function() {
            that.css(vendor + 'TransitionProperty', transProp).css(vendor + 'Transform', transform); 
        }, 10);
    }
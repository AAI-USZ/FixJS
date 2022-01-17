function() {
            var self = this;
            var $callout = $('.NB-callout-mouse-indicator');
            
            if (self.model.preference('lock_mouse_indicator')) {
                self.model.preference('lock_mouse_indicator', 0);
                $('.NB-callout-text', $callout).text('Unlocked');
            } else {
                self.model.preference('lock_mouse_indicator', this.cache.mouse_position_y);
                $('.NB-callout-text', $callout).text('Locked');
            }
            
            setTimeout(function() {
                self.flags['still_hovering_on_mouse_indicator'] = true;
                $callout.fadeOut(200);
            }, 500);
        }
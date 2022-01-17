function(evt) {
                //evt.stopPropagation();
                if (self.opts.fixed) return;
                moving = false;
                self.elm().css('cursor','inherit');
            }
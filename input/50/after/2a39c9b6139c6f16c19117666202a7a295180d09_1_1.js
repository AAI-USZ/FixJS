function(evt) {
                evt.preventDefault();
                if (self.opts.fixed) return;
                //evt.stopPropagation();
                moving = true;
                self.elm().css('cursor',self._vertical ?  'col-resize': 'row-resize');
            }
function(evt) {
                evt.preventDefault();
                //evt.stopPropagation();
                moving = true;
                self.elm().css('cursor',self._vertical ?  'col-resize': 'row-resize');
            }
function() {
            var self = this,
                target = self.get('target'),
                render = self.fire(Button.event.beforeRender);
            if (render === false) {
                S.log(LOG_PREFIX + 'button render was prevented.');
                return false;
            } else {
                if (target == null) {
                    S.log(LOG_PREFIX + 'Cannot find target!');
                    return false;
                }
                self._createInput();
                self.fire(Button.event.afterRender);
                return self;
            }
        }
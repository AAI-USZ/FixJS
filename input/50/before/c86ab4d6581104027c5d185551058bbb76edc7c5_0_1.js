function(evt) {
                    if (Widget.identifyKeyEvent(evt) === 'enter') {
                        self._verifyInputValue();
                    }
                }
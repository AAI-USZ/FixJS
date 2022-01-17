function(evt) {
                    if (Widget.identifyKeyEvent(evt) in {enter:'', tab:''}) {
                        self._verifyInputValue();
                        self.menu.hide();
                    }
                }
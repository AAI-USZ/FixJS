function(e) {
                var evt = new EventClass(e);
                if (evt.keyCode() === 9 && self.options.customTabKey) {
                    self.options.customTabKey();
                    return false;
                }
            }
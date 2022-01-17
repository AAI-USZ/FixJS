function(e, el) {
                if (e.key == 'enter') {
                    if (self.options.addOnBlur) {
                        el.blur()
                    }
                    else {
                        self.extractTags() && e.stop()
                    }
                }
            }
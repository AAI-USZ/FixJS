function (e) {
                        if (isNaN(kval)) {
                            self.isPressed = false;
                            if (to) {
                                window.clearTimeout(to);
                                to = null;
                                m = 1;
                                self.val(self.target.val());
                            }
                        } else {
                            // kval postcond
                            (self.target.val() > self.options.max && self.target.val(self.options.max))
                            || (self.target.val() < self.options.min && self.target.val(self.options.min));
                        }

                    }
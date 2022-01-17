function(event) {
                        if (!self.shown) {
                            if (self._handlers.show) {
                                self._handlers.show.call(
                                    field,
                                    event,
                                    {
                                        done : self._proxy(self.show, self),
                                        hide : self._proxy(self.hide, self)
                                    }
                                );
                            } else {
                                self.show();
                            }
                        }
                    }
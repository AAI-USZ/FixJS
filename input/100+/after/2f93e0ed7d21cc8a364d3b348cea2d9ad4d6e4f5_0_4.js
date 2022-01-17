function(event) {
                    var
                        beg      = 0,
                        day      = 0,
                        year     = 0,
                        month    = 0,
                        node     = event.target,
                        switcher = node.className,
                        data     = [],
                        item     = null;

                    if (switcher == 'b-cal__prev') {
                        self.prev();
                    } else if (switcher == 'b-cal__next') {
                        self.next();
                    } else if (switcher == 'b-cal__hide') {
                        self.hide();
                    } else if (switcher.match('b-cal__day_is_enabled')) {
                        day   = node.getAttribute('data-day');
                        year  = node.getAttribute('data-year');
                        month = node.getAttribute('data-month');

                        data  = {
                            raw   : new Date(year, month, day),
                            field : self._nodes.field
                        };
                        data.human = Cal.human(data.raw);

                        self._nodes.items.clicked = node;

                        if (self._handlers.select) {
                            self._handlers.select.call(
                                node,
                                event,
                                {
                                    hide   : self._proxy(self._hide,    self),
                                    done   : self._proxy(self.select,   self),
                                    reset  : self._proxy(self.reset,    self),
                                    undone : self._proxy(self.deselect, self)
                                },
                                data
                            );
                        } else {
                            self.select();
                        }
                    } else if (switcher.match('b-cal__day_is_chosen')) {
                        self._nodes.items.clicked = node;

                        if (self._handlers.deselect) {
                            self._handlers.deselect.call(
                                node,
                                event,
                                {
                                    done  : self._proxy(self.deselect, self),
                                    hide  : self._proxy(self._hide,    self),
                                    reset : self._proxy(self.reset,    self)
                                }
                            );
                        } else {
                            self.deselect();
                        }
                    }
                }
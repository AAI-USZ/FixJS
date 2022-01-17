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

                    switch (switcher) {

                        //
                        case 'b-cal__prev':
                            self.prev();
                        break;

                        //
                        case 'b-cal__next':
                            self.next();
                        break;

                        //
                        case 'b-cal__hide':
                            self.hide();
                        break;

                        //
                        case 'b-cal__day b-cal__day_is_enabled':
                        case 'b-cal__day b-cal__day_is_enabled b-cal__day_is_holiday':
                        case 'b-cal__day b-cal__day_in_past b-cal__day_is_enabled':
                        case 'b-cal__day b-cal__day_in_presence b-cal__day_is_enabled':
                        case 'b-cal__day b-cal__day_in_future b-cal__day_is_enabled':
                        case 'b-cal__day b-cal__day_in_past b-cal__day_is_enabled b-cal__day_is_holiday':
                        case 'b-cal__day b-cal__day_in_presence b-cal__day_is_enabled b-cal__day_is_holiday':
                        case 'b-cal__day b-cal__day_in_future b-cal__day_is_enabled b-cal__day_is_holiday':
                            day   = node.getAttribute('data-day');
                            year  = node.getAttribute('data-year');
                            month = node.getAttribute('data-month');
                            data  = {
                                raw   : new Date(year, month, day),
                                field : self._nodes.field
                            };

                            data.human = self.human(data.raw, self._lang);

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
                        break;

                        //
                        case 'b-cal__day b-cal__day_is_enabled b-cal__day_is_chosen':
                        case 'b-cal__day b-cal__day_is_enabled b-cal__day_is_holiday b-cal__day_is_chosen':
                        case 'b-cal__day b-cal__day_in_presence b-cal__day_is_enabled b-cal__day_is_chosen':
                        case 'b-cal__day b-cal__day_in_presence b-cal__day_is_enabled b-cal__day_is_holiday b-cal__day_is_chosen':
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
                        break;

                    }
                }
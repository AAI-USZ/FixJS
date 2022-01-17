function() {
            var
                self  = this,
                block = this._nodes.block,
                field = this._nodes.field;

            // These handlers should be binded only if the field is given
            if (field) {
                // Turn off autocomplete
                field.setAttribute('autocomplete', 'off');

                // Close calendar on click ewerywhere
                this._events.push(
                    this._bind(document, 'click', function(event) {
                        var
                            node = event.target;
    
                        if (!node.className.match('b-cal') && node != field) {
                            self.hide();
                        }
                    })
                );

                // Close calendar on ESC
                this._events.push(
                    this._bind(document, 'keydown', function(event) {
                        if (event.keyCode == 27 && self.shown) {
                            self.hide();
                        }
                    })
                );

                // Catch keys in field
                this._events.push(
                    this._bind(field, 'keydown', function(event) {
                        var
                            code = event.keyCode;

                        if (!event.ctrlKey && !event.metaKey && !self.shown) {
                            self.show();
                        }

                        switch (code) {

                            // Filter keys
                            case 9:
                            case 16:
                            case 17:
                            case 18:
                            case 20:
                            case 27:
                            case 37:
                            case 38:
                            case 39:
                            case 224:
                                return true;
                            break;

                            // Show on down arrow
                            case 40:
                                if (!self.shown) {
                                    self.show();
                                }
                            break;

                            // Close on Enter
                            case 13:
                                if (self.shown) {
                                    event.preventDefault();
                                    self.hide();
                                }
                            break;

                            //
                            default:
                                if (self._timer) {
                                    clearTimeout(self._timer);
                                }

                                self._timer = setTimeout(self._proxy(self.jump, self), 500);
                            break;

                        }
                    })
                );

                // Catch mousedown on field
                this._events.push(
                    this._bind(field, 'mousedown', function(event) {
                        if (!self.shown) {
                            field.focus();
                        }
                    })
                );

                // Catch focus on field
                this._events.push(
                    this._bind(field, 'focus', function(event) {
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
                    })
                );

                // Catch focus on field
                this._events.push(
                    this._bind(field, 'click', function(event) {
                        this.focus();
                    })
                );

                // 
                this._events.push(
                    this._bind(field, 'click', function(event) {
                        if (!self.shown && self.hiddenable) {
                            if (self._handlers.show) {
                                self._handlers.show.call(
                                    block,
                                    event,
                                    {
                                        done  : self._proxy(self.show,  self),
                                        hide  : self._proxy(self.hide,  self),
                                        reset : self._proxy(self.reset, self)
                                    }
                                );
                            } else {
                                self.show();
                            }
                        }
                    })
                );
            }

            // 
            this._events.push(
                this._bind(block, 'click', function(event) {
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
                })
            );

            return this;
        }
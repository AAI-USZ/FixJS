function() {
            var self = this;
            var defaultEvents = self.constructor.ATTACH;
            if (defaultEvents) {
                self._removeEvents(defaultEvents);
            }
            var defaultDocEvents = self.constructor.DOCATTACH;
            if (defaultDocEvents) {
                self._removeEvents(defaultDocEvents, S.one(document));
            }

            self._undelegateEvents();
            var events = self.get("events");
            if (events) {
                this._removeEvents(events);
            }
        }
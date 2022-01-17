function (topic, handler) {
            var _h = handler.bind(this);
            // add this handler to `app_events` to allow quick unsubscribing later
            this.app_events[topic] = _h;
            uijet.subscribe(topic, _h);
            return this;
        }
function (topic, handler) {
            var _h = handler.bind(this);
            // add this handler to the `app_events` option to allow quick unsubscribing later
            this.options.app_events[topic] = _h;
            uijet.subscribe(topic, _h);
            return this;
        }
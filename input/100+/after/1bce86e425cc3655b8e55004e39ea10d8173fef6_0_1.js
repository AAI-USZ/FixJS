function () {
            var ops = this.options,
                _app_events = ops.app_events || {},
                _signals;
            this.app_events = {};
            // listen to all signals set in options
            if ( _signals = ops.signals ) {
                for ( var n in _signals ) {
                    this.listen(n, _signals[n]);
                }
            }
            if ( ops.wake_on_startup ) {
                this.app_events.startup = function () { this.wake(); };
            }
            // subscribe to all app (custom) events set in options
            if ( ops.app_events ) {
                for ( n in _app_events ) {
                    this.subscribe(n, _app_events[n]);
                }
            }
            // capture and delegate all `uijet-route` and/or anchor clicks to routing/publishing mechanism
            this.captureRoutes();
            return this;
        }
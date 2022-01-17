function (config) {
        var self = this;

        self._html5  = self.get('html5');
        self._routes = [];
        self._url    = self._getURL();

        // Necessary because setters don't run on init.
        self._setRoutes(config && config.routes ? config.routes :
                self.get('routes'));

        // Set up a history instance or hashchange listener.
        if (self._html5) {
            self._history       = new Y.HistoryHTML5({force: true});
            self._historyEvents =
                    Y.after('history:change', self._afterHistoryChange, self);
        } else {
            self._historyEvents =
                    Y.on('hashchange', self._afterHistoryChange, win, self);
        }

        // Fire a `ready` event once we're ready to route. We wait first for all
        // subclass initializers to finish, then for window.onload, and then an
        // additional 20ms to allow the browser to fire a useless initial
        // `popstate` event if it wants to (and Chrome always wants to).
        self.publish(EVT_READY, {
            defaultFn  : self._defReadyFn,
            fireOnce   : true,
            preventable: false
        });

        self.once('initializedChange', function () {
            Y.once('load', function () {
                setTimeout(function () {
                    self.fire(EVT_READY, {dispatched: !!self._dispatched});
                }, 20);
            });
        });
    }
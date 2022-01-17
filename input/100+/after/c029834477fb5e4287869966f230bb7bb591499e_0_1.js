function Server(options) {
        assert.object(options, 'options');
        assert.object(options.dtrace, 'options.dtrace');
        assert.object(options.log, 'options.log');
        assert.object(options.router, 'options.router');

        var self = this;

        EventEmitter.call(this);

        this.acceptable = [];
        this.before = [];
        this.chain = [];
        this.dtp = options.dtrace;
        this.formatters = {};
        this.log = options.log;
        this.name = options.name || 'restify';
        this.router = options.router;
        this.routes = {};
        this.secure = false;
        this._user_dtrace = options._user_dtrace || false;
        this.version = options.version || null;

        if (options.formatters) {
                Object.keys(options.formatters).forEach(function (k) {
                        assert.func(options.formatters[k], 'formatter');

                        if (k.indexOf('/') === -1)
                                k = mime.lookup(k);

                        self.formatters[k] = options.formatters[k];
                        if (self.acceptable.indexOf(k) === -1)
                                self.acceptable.push(k);
                });
        }

        Object.keys(formatters).forEach(function (k) {
                if (!self.formatters[k]) {
                        self.formatters[k] = formatters[k];
                        if (self.acceptable.indexOf(k) === -1)
                                self.acceptable.push(k);
                }
        });

        if (options.certificate && options.key) {
                this.certificate = options.certificate;
                this.key = options.key;
                this.secure = true;

                this.server = https.createServer({
                        cert: options.certificate,
                        key: options.key
                });
        } else {
                this.server = http.createServer();
        }


        var log = this.log;

        PROXY_EVENTS.forEach(function (e) {
                function _emit() {
                        return (EventEmitter.prototype.emit.call(arguments));
                }
                var emit = _emit.bind(e);

                self.server.on(e, function () {
                        if (log.trace())
                                log.trace({event: e}, 'event handled');

                        return (emit.call(arguments));
                });
        });


        // Now the things we can't blindly proxy
        this.server.on('checkContinue', function onCheckContinue(req, res) {
                if (log.trace())
                        log.trace({event: 'checkContinue'}, 'event handled');

                if (self.listeners('checkContinue').length > 0)
                        return (self.emit('checkContinue', req, res));

                if (!options.noWriteContinue)
                        res.writeContinue();

                self._setupRequest(req, res);
                return (self._handle(req, res, true));
        });

        this.server.on('request', function onRequest(req, res) {
                if (log.trace())
                        log.trace({event: 'request'}, 'event handled');

                if (self.listeners('request').length > 0)
                        return (self.emit('request', req, res));

                self._setupRequest(req, res);
                return (self._handle(req, res));
        });

        this.__defineGetter__('maxHeadersCount', function () {
                return (self.server.maxHeadersCount);
        });

        this.__defineSetter__('maxHeadersCount', function (c) {
                self.server.maxHeadersCount = c;
                return (c);
        });


        this.__defineGetter__('url', function () {
                if (self.socketPath)
                        return ('http://' + self.socketPath);

                var addr = self.address();
                var str = self.secure ? 'https://' : 'http://';
                str += addr.address;
                str += ':';
                str += addr.port;
                return (str);
        });

}
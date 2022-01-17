function (host, port, options, routes) {

    var that = this;

    // Confirm that Server is called as constructor

    if (this.constructor != Server) {

        Utils.abort('Server must be instantiated using new');
    }

    // Register as event emitter

    Events.EventEmitter.call(this);

    // Set basic configuration

    this.settings = Utils.merge(Utils.clone(Defaults.server), options || {});
    this.settings.host = host.toLowerCase();
    this.settings.port = port;
    this.settings.name = (this.settings.name ? this.settings.name.toLowerCase() : (this.settings.host + ':' + this.settings.port));
    this.settings.uri = (this.settings.tls ? 'https://' : 'http://') + this.settings.host + ':' + this.settings.port + '/';

    // Initialize authentication configuration and validate

    if (this.settings.authentication) {

        this.settings.authentication = Utils.merge(Utils.clone(Defaults.authentication), this.settings.authentication);

        if (this.settings.authentication.tokenEndpoint === null ||
            this.settings.authentication.loadClientFunc === null ||
            this.settings.authentication.loadUserFunc === null ||
            this.settings.authentication.checkAuthorizationFunc === null ||
            this.settings.authentication.aes256Keys.oauthRefresh === null ||
            this.settings.authentication.aes256Keys.oauthToken === null) {

            Utils.abort('Invalid authentication configuration');
        }
    }

    // Verify no existing instances using the same uri or name

    if (internals.servers[this.settings.name]) {

        Utils.abort('Cannot configure multiple server instances using the same name or uri');
    }

    // Add to instance list

    internals.servers[this.settings.name] = this;

    // Initialize cache engine

    if (this.settings.cache) {

        if (this.settings.cache.implementation) {

            this.cache = this.settings.cache.implementation;
            this.settings.cache.implementation = null;
        }
        else {

            this.settings.cache = Utils.merge(Utils.clone(Defaults.cache), this.settings.cache);

            if (this.settings.cache.engine === 'joi') {

                this.cache = new Joi.Cache(this.settings.cache.options);
                this.cache.on('ready', function (err) {

                    if (err) {

                        Utils.abort('Failed to initialize cache engine: ' + err);
                    }
                });
            }
            else {

                Utils.abort('Unknown cache engine: ' + this.settings.cache.engine);
            }
        }
    }
    else {

        this.cache = null;
    }

    // Create router

    this.router = new Director.http.Router();
    this.router.configure({

        async: true,
        notfound: this.unhandledRoute()
    });

    var listenerEntryFunc = function (req, res) {

        var dispatch = function () {

            that.router.dispatch(req, res, function (err) {

                if (err) {

                    // Should never get called since 'notfound' is set

                    Log.err('Internal routing error');
                    res.writeHead(500);
                    res.end();
                }
            });
        };

        if (that.settings.ext.onRequest) {

            // onRequest can change internal req values (e.g. url, method)

            that.settings.ext.onRequest(req, res, function () {

                dispatch();
            });
        }
        else {

            dispatch();
        }
    };

    // Create server

    if (this.settings.tls) {

        var tls = {

            key: Fs.readFileSync(this.settings.tls.key),
            cert: Fs.readFileSync(this.settings.tls.cert)
        };

        this.listener = Https.createServer(tls, listenerEntryFunc);
    }
    else {

        this.listener = Http.createServer(listenerEntryFunc);
    }

    // Initialize Monitoring if set

    this.monitor = new Monitor(this, this.settings, Log);

    // Setup OPTIONS handler

    this.router.options(/.+/, function () {

        that.setCorsHeaders(this.res);
        internals.respond(this.res, 200);
    });

    // Setup OAuth token endpoint

    if (this.settings.authentication) {

        this.addRoute({

            method: 'POST',
            path: this.settings.authentication.tokenEndpoint,
            handler: Session.token,
            schema: Session.type.endpoint,
            mode: 'raw',
            authentication: 'optional',
            user: 'any',
            tos: 'none'
        });
    }

    // Add routes

    if (routes) {

        this.addRoutes(routes);
    }

    return this;
}
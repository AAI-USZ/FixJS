function configureServer(config, resources) {
		config = config || {};
		
		if (!config.webserver) {
			return callback(null, app);
		}

		if (config.logging) {
			require('crafity-logging').create(config.logging);
		}

		app.config = config;

		app.onconfigure = function (handler) {
			onconfigureEvent.subscribe(handler);
		};

		app.onlistening = function (handler) {
			onlisteningEvent.subscribe(handler);
		};

		app.onerror = function (handler) {
			onerrorEvent.subscribe(handler);
		};

		app.exit = function exit(exitCode) {
			try { app.close(); } catch (err) {}
			process.exit(exitCode || 0);
		};
		process.on('SIGTERM', app.exit);
		process.on('SIGHUP', app.exit);

		app.sendError = sendError;

		app.configure(synchronizer.register("config", function () {
			app.use(function (req, res, next) {
				res.setHeader("X-Powered-By", "Crafity");
				res.setHeader("x-crafity-location", req.url.replace('?layout=false&', '?').replace('?layout=false', '').replace('&layout=false', ''));
				next();
			});
			app.use(express.favicon(process.cwd() + '/static/favicon.ico'));

			app.use(function (req, res, next) {
				try {
					var writeHead = res.writeHead
						, end = res.end;
					res.writeHead = function (statusCode) {
						if (typeof statusCode === 'number') {
							res.statusCode = statusCode
						}
						writeHead.apply(res, arguments);
					};
					res.end = function (statusCode) {
						if (typeof statusCode === 'number') {
							res.statusCode = statusCode
						}
						log(req, res);
						end.apply(res, arguments);
					};
				} catch (err) {
					console.log("err", err);
				}
				next();
			});

			if (config.webserver.views) {
				console.log("Using Body Parser");
				app.use(express.bodyParser());
			}
			if (config.webserver.cookies || typeof config.webserver.cookies === 'undefined') {
				console.log("Using Cookies");
				app.use(express.cookieParser());
			}
			if (config.webserver.session) {
				console.log("Using Session");
				app.use(express.session({
					secret: config.webserver.session.secret,
					store: new RedisStore({ "db": config.webserver.session.db }),
					cookie: { maxAge: new Date(new Date().setMinutes(new Date().getMinutes() + config.webserver.session.timeout || 240)) }
				}));
				express.session.ignore.push('/favicon.ico');
				express.session.ignore.push('/robots.txt');
				app.use(flash.middleware());
			}
			if (config.webserver.resources) {
				console.log("Using Resources");
				app.resources = resources;
				app.use(resources.resourceParser());
			}
			if (config.webserver.oauth) {
				console.log("Using OAuth");
				app.auth = auth.init(app);
				app.oauth = oauth.init(app);
			}
			console.log("Using GZip");
			app.use(gzip.gzip());

			app.use(express.errorHandler({
				dumpExceptions: config.webserver.dumpExceptions,
				showStack: config.webserver.showStack
			}));

			function extend(name, fn) {
				app[name] = function () {
					var args = Array.prototype.slice.call(arguments)
						, handler = args.pop();

					function replacementHandler(req, res) {
						//log(req, null);

						(function render(renderfn) {
							res.render = function () {
								var args = Array.prototype.slice.call(arguments)
									, defaultOptions = {}
									, options = args.length > 1 ? args.pop() : {}
									, result;

								if (req.query && req.query.layout) {
									req.query.layout = [].concat(req.query.layout)
										.reduce(function (first, next) {
											return first || next;
										});
								}

								defaultOptions.url = req.url;
								defaultOptions.returnUrl = req.returnUrl;
								defaultOptions.locations = config.webserver && config.webserver.locations;
								defaultOptions.config = app.config;
								defaultOptions.flash = req.flash.getMessages();
								defaultOptions.useLayout = req.query && req.query.layout !== "false";
								defaultOptions.auth = req.auth;
								defaultOptions.currentProfile = req.auth.currentProfile;
//								defaultOptions.session = req.session;
//								defaultOptions.customFlash = false;
								//defaultOptions.details = req.query && req.query.details !== "false";
								//defaultOptions.summary = req.query && req.query.summary === "true";
								//defaultOptions.createUrl = req.createUrl;
								//defaultOptions.createUrlState = req.createUrlState;
								//defaultOptions.getUrlParam = req.getUrlParam;

								if (req.query["return"]) {
									defaultOptions.currentUrl = req.url.replace("?return=" + req.query["return"], "?").replace("&return=" + req.query["return"], "")
										.replace("?layout=" + req.query["layout"], "?").replace("&layout=" + req.query["layout"], ""); //.replace('?', encodeURIComponent("?")).replace('&', encodeURIComponent("&"));
									defaultOptions.currentUrl = defaultOptions.currentUrl.replace("?layout=false", "?").replace("&layout=false", "");
								} else {
									defaultOptions.currentUrl = req.url.replace("?layout=" + req.query["layout"], "?").replace("&layout=" + req.query["layout"], ""); //.replace('?', encodeURIComponent("?")).replace('&', encodeURIComponent("&"));
								}
								if (defaultOptions.currentUrl.match(/\?$/)) {
									defaultOptions.currentUrl = defaultOptions.currentUrl.substr(0, defaultOptions.currentUrl.length - 1);
								}
								if (config.webserver.views && config.webserver.views.layouts &&
									config.webserver.views.layouts.content && req.query.layout === 'false') {
									defaultOptions.layout = config.webserver.views.layouts.content;
								}

								options = objects.extend(defaultOptions, options);

								result = renderfn.apply(res, args.concat(options));
								req.flash.empty();
								return result;
							}
						}(res.render));

						(function redirect(redirectfn) {
							res.redirect = function (url) {

								if (req.query.layout && !url.match(/(\?|&){1}layout=/)) {
									url += (url.indexOf("?") > -1 ? "&" : "?") + "layout=" + req.query.layout;
								}

								return redirectfn.call(res, url);
							};
						}(res.redirect));

						req.session = req.session || {};
						req.resources = req.resources || {};
						req.unsafeParams = req.params;
						req.returnUrl = decodeURIComponent((req.query && req.query["return"] ? req.query["return"] : undefined) || req.headers.referrer || "");
						req.params = {};
						Object.keys(req.unsafeParams).forEach(function (key) {
							if (req.unsafeParams.hasOwnProperty(key)) {
								req.params[key] = req.unsafeParams[key] && app.sanitizeInput(req.unsafeParams[key]);
							}
						});
						req.unsafeBody = req.body;
						req.body = {};
						if (req.unsafeBody) {
							Object.keys(req.unsafeBody).forEach(function (key) {
								if (req.unsafeBody.hasOwnProperty(key)) {
									req.body[key] = app.sanitizeInput(req.unsafeBody[key]);
								}
							});
						}
						req.state = new State(req);
						req.createUrl = urlBuilder.create(req);
						req.createUrlState = urlBuilder.createUrlState(req);
						req.getUrlParam = urlBuilder.getParam(req);
						res.catchError = function (callback) {
							return function (err) {
								if (err) {
									return app.sendError(req, res, err);
								} else {
									try {
										return callback.apply(callback, arguments);
									} catch (err) {
										return app.sendError(req, res, err);
									}
								}
							};
						};
						try {
							return handler.apply(app, arguments)
						} catch (err) {
							app.sendError(req, res, err);
						}
					}

					fn.apply(app, args.concat(replacementHandler));

				};
			}

			["get", "post", "all"].forEach(function (name) {
				extend(name, app[name]);
			});

			if (config.webserver.views) {
				console.log("Using View Engine");
				app.set('views', process.cwd() + config.webserver.views.path);
				app.set('view engine', config.webserver.views.engine);
				if (config.webserver.views.layouts && config.webserver.views.layouts["default"]) {
					app.set('view options', { layout: config.webserver.views.layouts["default"] });
				}
				if (config.webserver.views.cached) {
					app.enable('view cache')
				}
			}

			if (app.config.webserver.assests) {
				console.log("Using Assets compression and concatenation");
				app.use(assests.assests(app.config.webserver.assests));
			}

			app.use(app.router);

		}));
	}
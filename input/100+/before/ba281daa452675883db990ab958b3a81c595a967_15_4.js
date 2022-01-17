function(args, callback) {

        if (!this.Array) {
            this._attach(['yui-base']);
        }

        var len, loader, handleBoot, handleRLS,
            Y = this,
            G_ENV = YUI.Env,
            mods = G_ENV.mods,
            Env = Y.Env,
            used = Env._used,
            aliases = G_ENV.aliases,
            queue = G_ENV._loaderQueue,
            firstArg = args[0],
            YArray = Y.Array,
            config = Y.config,
            boot = config.bootstrap,
            missing = [],
            i,
            r = [],
            ret = true,
            fetchCSS = config.fetchCSS,
            process = function(names, skip) {

                var i = 0, a = [], name, len, m, req, use;

                if (!names.length) {
                    return;
                }

                if (aliases) {
                    len = names.length;
                    for (i = 0; i < len; i++) {
                        if (aliases[names[i]] && !mods[names[i]]) {
                            a = [].concat(a, aliases[names[i]]);
                        } else {
                            a.push(names[i]);
                        }
                    }
                    names = a;
                }
                
                len = names.length;
                
                for (i = 0; i < len; i++) {
                    name = names[i];
                    if (!skip) {
                        r.push(name);
                    }

                    // only attach a module once
                    if (used[name]) {
                        continue;
                    }
                    
                    m = mods[name];
                    req = null;
                    use = null;

                    if (m) {
                        used[name] = true;
                        req = m.details.requires;
                        use = m.details.use;
                    } else {
                        // CSS files don't register themselves, see if it has
                        // been loaded
                        if (!G_ENV._loaded[VERSION][name]) {
                            missing.push(name);
                        } else {
                            used[name] = true; // probably css
                        }
                    }

                    // make sure requirements are attached
                    if (req && req.length) {
                        process(req);
                    }

                    // make sure we grab the submodule dependencies too
                    if (use && use.length) {
                        process(use, 1);
                    }
                }

            },

            handleLoader = function(fromLoader) {
                var response = fromLoader || {
                        success: true,
                        msg: 'not dynamic'
                    },
                    redo, origMissing,
                    ret = true,
                    data = response.data;

                Y._loading = false;

                if (data) {
                    origMissing = missing;
                    missing = [];
                    r = [];
                    process(data);
                    redo = missing.length;
                    if (redo) {
                        if ([].concat(missing).sort().join() ==
                                origMissing.sort().join()) {
                            redo = false;
                        }
                    }
                }

                if (redo && data) {
                    Y._loading = true;
                    Y._use(missing, function() {
                        Y.log('Nested use callback: ' + data, 'info', 'yui');
                        if (Y._attach(data)) {
                            Y._notify(callback, response, data);
                        }
                    });
                } else {
                    if (data) {
                        // Y.log('attaching from loader: ' + data, 'info', 'yui');
                        ret = Y._attach(data);
                    }
                    if (ret) {
                        Y._notify(callback, response, args);
                    }
                }

                if (Y._useQueue && Y._useQueue.size() && !Y._loading) {
                    Y._use.apply(Y, Y._useQueue.next());
                }

            };

// Y.log(Y.id + ': use called: ' + a + ' :: ' + callback, 'info', 'yui');

        // YUI().use('*'); // bind everything available
        if (firstArg === '*') {
            args = [];
            for (i in mods) {
                if (mods.hasOwnProperty(i)) {
                    args.push(i);
                }
            }
            ret = Y._attach(args);
            if (ret) {
                handleLoader();
            }
            return Y;
        }

        if (mods['loader'] && !Y.Loader) {
            Y.log('Loader was found in meta, but it is not attached. Attaching..', 'info', 'yui');
            Y._attach(['loader']);
        }

        // Y.log('before loader requirements: ' + args, 'info', 'yui');

        // use loader to expand dependencies and sort the
        // requirements if it is available.
        if (boot && Y.Loader && args.length) {
            Y.log('Using loader to expand dependencies', 'info', 'yui');
            loader = getLoader(Y);
            loader.require(args);
            loader.ignoreRegistered = true;
            loader._boot = true;
            loader.calculate(null, (fetchCSS) ? null : 'js');
            args = loader.sorted;
            loader._boot = false;
        }
        
        process(args);

        len = missing.length;


        if (len) {
            missing = YArray.dedupe(missing);
            len = missing.length;
Y.log('Modules missing: ' + missing + ', ' + missing.length, 'info', 'yui');
        }


        // dynamic load
        if (boot && len && Y.Loader) {
// Y.log('Using loader to fetch missing deps: ' + missing, 'info', 'yui');
            Y.log('Using Loader', 'info', 'yui');
            Y._loading = true;
            loader = getLoader(Y);
            loader.onEnd = handleLoader;
            loader.context = Y;
            loader.data = args;
            loader.ignoreRegistered = false;
            loader.require(args);
            loader.insert(null, (fetchCSS) ? null : 'js');

        } else if (boot && len && Y.Get && !Env.bootstrapped) {

            Y._loading = true;

            handleBoot = function() {
                Y._loading = false;
                queue.running = false;
                Env.bootstrapped = true;
                G_ENV._bootstrapping = false;
                if (Y._attach(['loader'])) {
                    Y._use(args, callback);
                }
            };

            if (G_ENV._bootstrapping) {
Y.log('Waiting for loader', 'info', 'yui');
                queue.add(handleBoot);
            } else {
                G_ENV._bootstrapping = true;
Y.log('Fetching loader: ' + config.base + config.loaderPath, 'info', 'yui');
                Y.Get.script(config.base + config.loaderPath, {
                    onEnd: handleBoot
                });
            }

        } else {
            Y.log('Attaching available dependencies: ' + args, 'info', 'yui');
            ret = Y._attach(args);
            if (ret) {
                handleLoader();
            }
        }

        return Y;
    }
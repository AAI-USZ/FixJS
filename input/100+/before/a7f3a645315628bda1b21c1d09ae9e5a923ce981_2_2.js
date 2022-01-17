function (src, req, res) {
        var $this = this;
        try {

            // Extract env vars from request headers
            var pfx = this.options.env_header_prefix;
            var env_vars = _.chain(req.headers).map(function (val, key) {
                try {
                    if (0 !== key.indexOf(pfx)) { return; }
                    var d_key = key.substr(pfx.length),
                        d_json = (new Buffer(val, 'base64'))
                                  .toString('utf-8'),
                        data = JSON.parse(d_json);
                    return [d_key, data];
                } catch (e) {
                    // No-op, ignore parsing errors for env vars
                }
            }).object().value();

            // Build the API context
            var api_ctx = new ks_api.APIContext({
                server_options: $this.options,
                env: env_vars,
                source: src,
                log: res.log
            });

            var macro_processor;
            if (this.macro_processor) {
                // Mostly for tests: If a macro_processor has been set for the
                // server, use it.
                macro_processor = _(this.macro_processor).clone();
            } else {
                // Get a class for rendering templates
                var template_name = this.options.template_class,
                    template_class = ks_templates[template_name] ||
                                     ks_templates.EJSTemplate;

                // Get a class for loading templates
                var loader_name = this.options.template_loader_class,
                    template_loader_class = ks_loaders[loader_name] ||
                                            ks_loaders.HTTPLoader;

                // Instantiate the macro processor
                var macro_processor = new ks_macros.MacroProcessor({
                    loader_class: template_loader_class,
                    loader_options: {
                        memcache: this.options.memcache,
                        url_template: this.options.template_url_template,
                        template_class: template_class
                    }
                });
            }

            // Process the macros...
            macro_processor.process(src, api_ctx, function (errors, result) {
                if (errors) {
                    errors.forEach(function (error) {
                        res.log.error(error.message, { 
                            name: 'kumascript',
                            template: '%s: %s',
                            args: [error.name, error.message, error.options]
                        });
                    });
                }
                res.send(result);
            });

        } catch (error) {
            res.log.error(error.message, { 
                name: 'kumascript',
                template: '%s: %s',
                args: [error.name, error.message, error.options]
            });
            // HACK: If all else fails, send back the source
            res.send(src);
        }
    }
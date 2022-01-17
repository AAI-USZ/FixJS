function (src, api_ctx, process_done) {
        var $this = this,
            errors = [],
            templates = {},
            macros = {};

        // Clone general loader options, since we'll tweak them per-request.
        var loader_options = _.clone($this.options.loader_options);
        if (api_ctx.env && api_ctx.env.cache_control) {
            // Pass along Cache-Control header, if any.
            loader_options.cache_control = api_ctx.env.cache_control;
        }
        var loader = new $this.options.loader_class(loader_options);

        // Attempt to parse the document, trap errors
        var tokens = [];
        try { tokens = ks_parser.parse(src); }
        catch (e) {
            errors.push(new DocumentParsingError({error: e, src: src}));
            return process_done(errors, src);
        }

        // Scan through the tokens, collect text nodes and queue unique macros.
        tokens.forEach(function (tok) {
            if ('TEXT' == tok.type) {
                // Doing nothing, here. But, we could conceivably filter text
                tok.out = tok.chars;
            } else if ('MACRO' == tok.type) {
                // Hash the macro name and args, to identify unique calls.
                tok.hash = crypto.createHash('md5')
                    .update(tok.name).update(tok.args.join(','))
                    .digest('hex');
                // If we haven't seen this macro before...
                if (!(tok.hash in macros)) {
                    // Queue the macro up to be processed, identified by hash.
                    macros[tok.hash] = tok;
                    templates[tok.name] = false;
                }
            }
        });

        // Give the API context access to the loader and errors
        api_ctx.loader = loader;
        api_ctx.errors = errors;

        // Kick off loading any autorequire templates.
        api_ctx.performAutoRequire(function (err) {
            if (err) {
                errors.push(new TemplateLoadingError({ error: err }));
            }
            // Load all the templates...
            $this.loadTemplates(loader, templates, src, function (tmpl_errors) {
                // Evaluate all the macros....
                $this.evaluateMacros(api_ctx, templates, macros, src, function (macro_errors) {
                    // Assemble the body of the response, and we're done.
                    var result = _.map(tokens, function (tok) {
                        if ('TEXT' == tok.type) {
                            return tok.out;
                        } else if ('MACRO' == tok.type) {
                            return macros[tok.hash].out;
                        }
                    }).join('');
                    var errors = [].concat(tmpl_errors, macro_errors);
                    process_done(errors.length ? errors : null, result);
                });
            });
        });
    }
function (err) {
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
        }
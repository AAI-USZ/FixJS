function (err) {
            if (err) {
                var ex = new TemplateLoadingError({error: err, src: src});
                errors.push(ex);
                $this.emit('error', ex);
            }
            $this.emit('autorequireEnd', {duration: new Date() - ts});
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
                    return _done(errors.length ? errors : null, result);
                });
            });
        }
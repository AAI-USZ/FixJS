function (hash, q_next) {
            var tok = macros[hash];
            var next = function (out) {
                tok.out = out;
                q_next();
            };

            // Make sure the template was loaded...
            var tmpl = templates[tok.name];
            if (!tmpl) { return next('{{ ' + tok.name + ' }}'); }
            try {
                // Try executing the template with macro arguments
                clone_ctx = _.clone(api_ctx).setArguments(tok.args);
                tmpl.execute(tok.args, clone_ctx, function (err, result) {
                    if (err) { 
                        // There was an error executing the template. :(
                        errors.push(new TemplateExecutionError({
                            token: tok, error: err, src: src
                        }));
                        return next('{{ ' + tok.name + ' }}');
                    }
                    return next(result);
                });
            } catch (e) {
                // There was an error executing the template. :(
                errors.push(new TemplateExecutionError({
                    token: tok, error: e, src: src
                }));
                return next('{{ ' + tok.name + ' }}');
            }

        }
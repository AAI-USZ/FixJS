function (hash, q_next) {
            var tok = macros[hash];
 
            // Wrap q_next callback in timing event.
            var ts = new Date();
            $this.emit('macroStart', {name: tok.name, args: tok.args});
            var next = function (out) {
                tok.out = out;
                $this.emit('macroEnd', {
                    name: tok.name, args: tok.args,
                    duration: new Date() - ts
                });
                q_next();
            }

            // Make sure the template was loaded...
            var tmpl = templates[tok.name];
            if (!tmpl) {
                return next('{{ ' + tok.name + ' }}');
            }
            try {
                // Try executing the template with macro arguments
                clone_ctx = _.clone(api_ctx).setArguments(tok.args);

                // Set up a timer for macro execution timeout error...
                var timed_out = false;
                var tm_start = (new Date()).getTime();
                var tmout_timer = setTimeout(function () {
                    timed_out = true;
                    var sec = ((new Date()).getTime() - tm_start) / 1000;
                    var ex = new TemplateExecutionError({
                        error: "Macro execution timed out after " + sec +
                               " seconds.",
                        token: tok, src: src
                    });
                    errors.push(ex);
                    $this.emit('error', ex);
                    return next('{{ ' + tok.name + ' }}');
                }, $this.options.macro_timeout || 120000);

                // Now, start with the execution!
                tmpl.execute(tok.args, clone_ctx, function (err, result) {
                    if (timed_out) return;
                    clearTimeout(tmout_timer);
                    if (err) { 
                        // There was an error executing the template. :(
                        var ex = new TemplateExecutionError({
                            token: tok, error: err, src: src});
                        errors.push(ex);
                        $this.emit('error', ex);
                        return next('{{ ' + tok.name + ' }}');
                    } else {
                        return next(result);
                    }
                });
            } catch (e) {
                // There was an error executing the template. :(
                var ex = new TemplateExecutionError({
                    token: tok, error: e, src: src});
                errors.push(ex);
                $this.emit('error', ex);
                return next('{{ ' + tok.name + ' }}');
            }

        }
function (err, result) {
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
                }
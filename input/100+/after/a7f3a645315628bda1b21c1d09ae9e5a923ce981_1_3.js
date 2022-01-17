function (name, q_next) {
            try {
                $this.emit('templateLoadStart', {name: name});
                loader.get(name, function (err, tmpl) {
                    if (!err) {
                        templates[name] = tmpl;
                        $this.emit('templateLoadEnd',
                            {name: name, template: tmpl});
                    } else {
                        var ex = new TemplateLoadingError({
                            name: name, error: err, src: src
                        });
                        // There was an error loading the template. :(
                        errors.push(ex);
                        $this.emit('error', ex);
                    }
                    q_next();
                });
            } catch (e) {
                // There was an error executing the template. :(
                var ex = new TemplateLoadingError({name: name, error: e, src: src});
                errors.push(ex);
                $this.emit('error', ex);
                q_next();
            }
        }
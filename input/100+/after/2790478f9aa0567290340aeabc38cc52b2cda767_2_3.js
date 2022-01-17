function (name, q_next) {
            try {
                // Wrap q_next callback in timing event.
                var ts = new Date();
                $this.emit('templateLoadStart', {name: name});
                function _q_next (cache_hit) {
                    $this.emit('templateLoadEnd', {
                        name: name, duration: new Date() - ts,
                        cache_hit: cache_hit
                    });
                    q_next();
                }

                loader.get(name, function (err, tmpl, cache_hit) {
                    if (!err) {
                        templates[name] = tmpl;
                    } else {
                        // There was an error loading the template. :(
                        var ex = new TemplateLoadingError({
                            name: name, error: err, src: src});
                        errors.push(ex);
                        $this.emit('error', ex);
                    }
                    _q_next(cache_hit);
                });
            } catch (e) {
                // There was an error executing the template. :(
                var ex = new TemplateLoadingError({name: name, error: e, src: src});
                errors.push(ex);
                $this.emit('error', ex);
                _q_next(false);
            }
        }
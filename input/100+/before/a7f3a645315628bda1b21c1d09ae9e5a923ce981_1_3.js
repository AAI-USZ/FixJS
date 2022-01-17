function (err, tmpl) {
                    if (!err) {
                        templates[name] = tmpl;
                    } else {
                        // There was an error loading the template. :(
                        errors.push(new TemplateLoadingError({
                            name: name, error: err
                        }));
                    }
                    q_next();
                }
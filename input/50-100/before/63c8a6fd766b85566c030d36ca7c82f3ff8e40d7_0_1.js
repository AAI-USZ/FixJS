function(err, t) {
                      if (err) return cb(err);
                      tmpl.partials[name] = t.template;
                      _.extend(tmpl.partials, t.partials);
                      cb();
                    }
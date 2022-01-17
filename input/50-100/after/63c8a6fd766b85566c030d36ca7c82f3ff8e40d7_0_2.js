function(name, cb) {
                    var pfile = path.join(dir, name + ext),
                        poptions = utile.clone(options);
                    poptions.cacheKey = pfile;

                    getTemplate(pfile, poptions, function(err, t) {
                      if (err) return cb(err);
                      tmpl.partials[name] = t.template;
                      // _.extend(tmpl.partials, t.partials);
                      tmpl.partials = utile.mixin(tmpl.partials, t.partials);
                      cb();
                    });
                  }
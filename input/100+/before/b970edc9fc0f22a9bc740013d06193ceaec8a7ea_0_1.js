function gen(params, cb) {

    // set default params
    params.sitemap = params.sitemap || {};
    params.__genId = dateformat('yyyymmddHHMMssLl');

    async.parallel([
      function (cb) {
        // copy static files as-is
        ncp.ncp(opts.statik, opts.out, cb);
      },
      function (cb) {
        // compile and evaluate templates
        engine.compile(opts.partials, function(partials) {
          engine.compile(opts.layouts, function(layouts) {
            engine.compile(opts.pages, function(pages) {
              engine.process(opts.out, pages, layouts, partials, params, cb);
            });
          });
        });
      }], function (err, results) {
        // pass the templates result as the final result
        cb(err, results[1]);
      });
  }
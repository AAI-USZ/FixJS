function (cb) {
      var context = { __file: page, sitemap: params.sitemap },
        partialsParams = _.extend(params, prms.params(context));

      // evaluate all partials with params for current context
      _process(partials, partialsParams, function (result) {
        context.partials = result;

        // evaluate all partials the second time for partials referencing other partials
        _process(partials, partialsParams, function (result) {
          context.partials = result;
          var pageParams = _.extend(params, prms.params(context));

          // evaluate page with partials-populated
          _process({ 'currpage': pages[page] }, pageParams, function (result) {
            var layoutParams = _.clone(pageParams);
            layoutParams.content = result.currpage;

            // evaluate layout with current page as its content
            var layout = (params.sitemap && params.sitemap[page] && params.sitemap[page].layout) ?
              params.sitemap[page].layout : 'default.html';
            f.mkdirs(p.join(dir, page).replace(/\/[^\/]+$/, ''), '0755', function (err) {
              _process({ 'currlayout': layouts[layout] }, layoutParams, function (result) {
                fs.writeFile(p.join(dir, page), result.currlayout, 'utf8', function (err) {
                  console.log('+ creating ' + p.join(dir, page));
                  cb(null);
                });
              });
            });
          });
        });  
      });
    }
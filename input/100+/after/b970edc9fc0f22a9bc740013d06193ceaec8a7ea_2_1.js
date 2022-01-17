function (dir, templates, params, cb) {

  // merge a set of params to a set of templates
  function _process(templates, params, cb) {
    var _templates = _.extend(templates, {}), // process template copies, not the originals
      tasks = {};

    _.keys(_templates).forEach(function (key) {
      tasks[key] = function (cb) {
        _templates[key].process(params, function (data) {
          cb(null, data);
        });
      };
    });

    async.parallel(tasks, function (err, results) {
      cb(results);
    });
  }

  var tasks = {};

  _.keys(templates.pages).forEach(function (page) {
    tasks[page] = function (cb) {

      var pageParams = _.extend(_.extend({}, params), functions(page, templates, params)),
        pageContent;

      function _mergePartials(cb) {
        _process(templates.partials, pageParams, function (result) {
          pageParams.partials = result;
          pageParams = _.extend(pageParams, functions(page, templates, pageParams));
          _process(templates.partials, pageParams, function (result) {
            pageParams.partials = result;
            cb();
          });
        });
      }

      function _mergePage(cb) {
        _process({ currpage: templates.pages[page] }, pageParams, function (result) {
          pageParams.content = result.currpage;
          cb();
        });
      }

      function _mergeLayout(cb) {
        var layout = (pageParams.sitemap && pageParams.sitemap[page] && pageParams.sitemap[page].layout) ? pageParams.sitemap[page].layout : 'default.html';
        _process({ currlayout: templates.layouts[layout] }, pageParams, function (result) {
          pageContent = result.currlayout;
          cb();
        });
      }

      function _writePage(cb) {
        f.mkdirs(p.join(dir, page).replace(/\/[^\/]+$/, ''), '0755', function (err) {
          if (!err) {
            fs.writeFile(p.join(dir, page), pageContent, 'utf8', function (err) {
              if (!err) {
                console.log('+ creating %s', p.join(dir, page));
              }
              cb(err);
            });
          } else {
            cb(err);
          }
        });
      }

      async.series([_mergePartials, _mergePage, _mergeLayout, _writePage], cb);
    }
  });

  async.parallel(tasks, function (err, results) {
    cb(err, _.keys(results));
  });
}
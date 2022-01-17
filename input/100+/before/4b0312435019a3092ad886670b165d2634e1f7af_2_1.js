function(callback) {
      var dirname, files, headerTplPath, navTplPath, pageTplPath, path, paths;
      if (Neat.root == null) {
        return puts(error("Can't run neat docco outside of a Neat project."));
      }
      paths = Neat.env.docco.paths.sources.concat();
      if (!(paths != null) || paths.empty()) {
        return puts(warn('No paths specified for documentation generation.'));
      }
      dirname = __dirname.replace('.cmd', '');
      navTplPath = resolve(dirname, '_navigation');
      headerTplPath = resolve(dirname, '_header');
      pageTplPath = resolve(dirname, '_page');
      files = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = paths.length; _i < _len; _i++) {
          path = paths[_i];
          _results.push(new DoccoFile(path));
        }
        return _results;
      })();
      ensureSync(resolve(Neat.root, 'docs'));
      return render(navTplPath, {
        files: files
      }, function(err, nav) {
        if (err != null) {
          throw err;
        }
        return render(headerTplPath, {
          files: files
        }, function(err, header) {
          var file, processors, _i, _len;
          if (err != null) {
            throw err;
          }
          processors = [];
          for (_i = 0, _len = files.length; _i < _len; _i++) {
            file = files[_i];
            processors.push(Processor.asCommand(file, header, nav));
          }
          return new Parallel(processors).run(function() {
            puts('Documentation successfully generated'.green);
            return typeof callback === "function" ? callback() : void 0;
          });
        });
      });
    }
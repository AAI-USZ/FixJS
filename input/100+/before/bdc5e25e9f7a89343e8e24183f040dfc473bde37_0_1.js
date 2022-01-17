function (err, res) {
    if (err) return cb(err);

    // make sure file isn't ignore
    function checkIgnore (file) {
      var res = true
        , ignore = self.attrs.ignore || [];

      ignore.forEach(function (ig) {
        var full = !fs.isPathAbsolute(ig)
          ? path.resolve(dir, ig)
          : ig;
        if (~file.indexOf(full)) {
          res = false;
          log.ign('#{file}', {
              file: file.replace(root, '.')
          });
        }
      });

      return res;
    }

    // prepare our file names
    res = res
      .filter(function (file) {
        var ext = path.extname(file).toLowerCase()
        if (ext !== '.js') return false;
        return checkIgnore(file);
      })
      .map(function (file) {
        return {
            req: file.replace(dir + '/', '')
          , file: file
        };
      });

    var buf = str;

    // include commonJS require header
    if (self.attrs.header !== false) {
      log.inc('[[ requires header ]](blue)');
      buf += '\n' + browser.require + '\n\n';
      buf += 'require.modules = {};\n\n';
      buf += 'require.resolve = ' + browser.resolve + ';\n\n';
      buf += 'require.register = ' + browser.register + ';\n\n';
      buf += 'require.relative = ' + browser.relative + ';\n\n';
      buf += 'require.alias = ' + browser.alias + ';\n\n';
    }

    // file iterator: load and modify
    function iterator (js, next) {
      log.inc('#{file}', {
          file: js.file.replace(root, '.')
      });

      fs.readFile(js.file, 'utf8', function (err, src) {
        if (err) return next (err);

        // modifications
        src = parseInheritance(src);
        src = parseReplace(src, self.attrs.replace);

        // include in buffer
        buf += '\nrequire.register("' + js.req + '", function(module, exports, require){\n';
        buf += src
          .split('\n')
          .map(function (line) {
            return line.length
              ? '  ' + line
              : line;
          })
          .join('\n');
        buf += '\n}); // module: ' + js.req + '\n';

        // continue
        next();
      });
    }

    // finish off this require
    function finalize (err) {
      if (err) return cb(err);

      // add entry point
      var entry = self.attrs.entry.replace(dir + '/', '')
        , name = self.attrs.package;
      buf += '\nrequire.alias("' + entry + '", "' + name + '");\n';
      log.expose('#{entry} [»](cyan) #{alias}', { entry: entry, alias: name });

      // send back to glossary
      cb(null, buf);
    }

    // run our iterator on each file
    breeze.forEachSeries(res, iterator, finalize);
  }
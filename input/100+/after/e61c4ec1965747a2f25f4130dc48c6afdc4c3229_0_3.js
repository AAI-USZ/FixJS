function (options) {
    // check if we should replace require with almond in html files
    if (options.config.almond === true && isArray(options.config.replaceRequireScript)) {
      var cheerio = require('cheerio');

      // iterate over all modules that are configured for replacement
      options.config.replaceRequireScript.forEach(function (entry, idx) {
        var files = grunt.file.expand(entry.files);
        // log almond including
        log.ok('Replacing require script calls, with almond module files');

        // iterate over found html files
        files.forEach(function (file, index) {
          // load file contents
          var contents = String(grunt.file.read(file, 'utf-8'));
          $ = cheerio.load(contents);
          // iterate over content nodes to find the correct script tags
          $('script').each(function (idx, elm) {

            // check for require js like script tags
            if ($(elm)[0].name.toLowerCase() === 'script' && $(elm)[0].attribs && $(elm)[0].attribs['data-main']) {
              // replace the attributes of requires script tag
              // with the 'almonded' version of the module
              var insertScript = _.isUndefined(entry.modulePath) !== true ? entry.modulePath : $(elm).attr('data-main');
              $(elm).attr('src', insertScript + '.js').removeAttr('data-main');
            }

          });

          // write out newly created file contents
          grunt.file.write(file, $.html(), 'utf-8');
        });
      });

      // check for callback, else mark as done
      if (isFunction(options.cb)) {
        options.cb();
      } else {
        options.done();
      }

    } else {

      // check for callback, else mark as done      
      if (isFunction(options.cb)) {
        options.cb();
      } else {
        options.done();
      }

    }
  }
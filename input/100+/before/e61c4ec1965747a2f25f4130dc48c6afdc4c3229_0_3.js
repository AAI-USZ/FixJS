function (options) {
    // check if we should replace require with almond in html files
    if (options.config.almond === true && isArray(options.config.replaceRequireScript)) {
      var $ = require('cheerio');

      // iterate over all modules that are configured for replacement
      options.config.replaceRequireScript.forEach(function (entry, idx) {
        var files = grunt.file.expand(entry.files);
        // log almond including
        log.ok('Replacing require script calls, with almond module files');

        // iterate over found html files
        files.forEach(function (file, index) {
          // load file contents
          var contents = String(grunt.file.read(file, 'utf-8'));
          // iterate over content nodes to find the correct script tags
          $(contents).each(function (idx, elm) {

            // check for require js like script tags
            if (String(elm.tagName).toLowerCase() === 'script' && $(elm).attr('data-main') !== '') {
              // replace the attributes of requires script tag
              // with the 'almonded' version of the module
              var $newElm = $(elm).clone(), newElm = $newElm[0].outerHTML;
              var insertScript = _.isUndefined(entry.modulePath) !== true ? entry.modulePath : $newElm.attr('data-main');
              contents = contents.replace($.trim(newElm.replace('<script', '').replace('></script>', '')), 'src="' + insertScript + '.js"');
            }

          });

          // write out newly created file contents
          grunt.file.write(file, contents, 'utf-8');
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
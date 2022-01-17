function (file, index) {
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
        }
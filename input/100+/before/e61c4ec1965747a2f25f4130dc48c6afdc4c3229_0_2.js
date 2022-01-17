function (file, index) {
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
        }
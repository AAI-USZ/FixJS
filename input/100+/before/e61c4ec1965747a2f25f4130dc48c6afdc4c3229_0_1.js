function (idx, elm) {

            // check for require js like script tags
            if (String(elm.tagName).toLowerCase() === 'script' && $(elm).attr('data-main') !== '') {
              // replace the attributes of requires script tag
              // with the 'almonded' version of the module
              var $newElm = $(elm).clone(), newElm = $newElm[0].outerHTML;
              var insertScript = _.isUndefined(entry.modulePath) !== true ? entry.modulePath : $newElm.attr('data-main');
              contents = contents.replace($.trim(newElm.replace('<script', '').replace('></script>', '')), 'src="' + insertScript + '.js"');
            }

          }
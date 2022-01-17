function(data, textStatus, xhr) {
              if ( options.ajaxCache && !caches[tipAttribute] ) {
                caches[tipAttribute] = {status: 'success', data: data, textStatus: textStatus, xhr: xhr};
              }

              cluetipContents = opts.ajaxProcess.call(link, data);

              // allow for changing the title based on data returned by xhr
              if ( typeof cluetipContents == 'object' && cluetipContents !== null ) {
                tipTitle = cluetipContents.title;
                cluetipContents = cluetipContents.content;
              }

              if (isActive) {
                if (optionSuccess) {
                  optionSuccess.call(link, data, textStatus, $cluetip, $cluetipInner);
                }
                $cluetipInner.html(cluetipContents);

              }
            }
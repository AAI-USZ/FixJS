function(xhr, textStatus) {
              if ( options.ajaxCache && !caches[cacheKey] ) {
                caches[cacheKey] = {status: 'error', textStatus: textStatus, xhr: xhr};
              }

              if (isActive) {
                if (optionError) {
                  optionError.call(link, xhr, textStatus, $cluetip, $cluetipInner);
                } else {
                  $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');
                }
              }
            }
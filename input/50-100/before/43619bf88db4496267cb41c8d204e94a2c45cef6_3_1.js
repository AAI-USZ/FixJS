function(xhr, textStatus) {
              if ( options.ajaxCache && !caches[tipAttribute] ) {
                caches[tipAttribute] = {status: 'error', textStatus: textStatus, xhr: xhr};
              }

              if (isActive) {
                if (optionError) {
                  optionError.call(link, xhr, textStatus, $cluetip, $cluetipInner);
                } else {
                  $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');
                }
              }
            }
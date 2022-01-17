function(e) {
          return jQuery('.fangspiel-area', element).sizedetect({
            rootPrefix: 'lib/sizedetect/',
            result: function(size, details) {
              Capkom.profile.set({
                symbolsizeMin: size,
                symbolsizedetectDetails: details
              });
              return Capkom.clickNext();
            }
          });
        }
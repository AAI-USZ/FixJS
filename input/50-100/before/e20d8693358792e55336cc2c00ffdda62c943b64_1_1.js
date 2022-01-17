function(element) {
        return jQuery('.start', element).button().click(function(e) {
          return jQuery('.fangspiel-area', element).sizedetect({
            result: function(size, details) {
              return Capkom.profile.set({
                symbolsizeMin: size,
                symbolsizedetectDetails: details
              });
            }
          });
        });
      }
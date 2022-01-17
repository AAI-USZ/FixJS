function(size, details) {
            Capkom.profile.set({
              symbolsizeMin: size,
              symbolsizedetectDetails: details
            });
            done();
            return Capkom.clickNext();
          }
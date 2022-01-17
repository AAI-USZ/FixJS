function(size, details) {
            Capkom.profile.set({
              symbolsizeMin: size,
              symbolsizedetectDetails: details
            });
            Capkom.canClick();
            return Capkom.clickNext();
          }
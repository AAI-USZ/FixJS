function(res) {
            Capkom.profile.set({
              wordmatch: res
            });
            done();
            Capkom.clickNext();
            return jQuery('.wortspiel-area', element).wordmatch('destroy');
          }
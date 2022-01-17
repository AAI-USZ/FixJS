function(res) {
              Capkom.profile.set({
                wordmatch: res
              });
              Capkom.clickNext();
              return jQuery('.wortspiel-area', element).wordmatch('destroy');
            }
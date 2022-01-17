function(res) {
              Capkom.profile.set({
                wordmatch: res
              });
              Capkom.clickNext();
              return jQuery(':Capkom-wordmatch.play-area', element).wordmatch('destroy');
            }
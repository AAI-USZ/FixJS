function(res) {
            Capkom.profile.set({
              wordmatch: res
            });
            done();
            Capkom.clickNext();
            jQuery('.play-area', element).wordmatch('destroy');
            return jQuery('.start', element).show();
          }
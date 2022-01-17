function(element, done) {
        jQuery('.play-area', element).wordmatch({
          rootPrefix: 'lib/wordmatch/img/',
          result: function(res) {
            Capkom.profile.set({
              wordmatch: res
            });
            done();
            Capkom.clickNext();
            jQuery('.play-area', element).wordmatch('destroy');
            return jQuery('.start', element).show();
          },
          questions: Capkom.wordmatchQuestions
        });
        return jQuery('.start', element).hide();
      }
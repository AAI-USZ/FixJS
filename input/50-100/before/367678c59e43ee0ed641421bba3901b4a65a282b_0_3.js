function(element, done) {
        return jQuery('.wortspiel-area', element).wordmatch({
          rootPrefix: 'lib/wordmatch/img/',
          result: function(res) {
            Capkom.profile.set({
              wordmatch: res
            });
            done();
            Capkom.clickNext();
            return jQuery('.wortspiel-area', element).wordmatch('destroy');
          },
          questions: Capkom.wordmatchQuestions
        });
      }
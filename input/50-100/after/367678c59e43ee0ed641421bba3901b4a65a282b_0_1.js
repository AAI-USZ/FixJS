function(e) {
          jQuery('.play-area', element).wordmatch({
            rootPrefix: 'lib/wordmatch/img/',
            result: function(res) {
              Capkom.profile.set({
                wordmatch: res
              });
              Capkom.clickNext();
              return jQuery('.play-area', element).wordmatch('destroy');
            },
            questions: Capkom.wordmatchQuestions
          });
          return jQuery('.start', element).hide();
        }
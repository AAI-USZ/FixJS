function(done) {
          var weiterArea;
          weiterArea = explainArea.append("<div class='weiter'></div>").find('.weiter');
          return weiterArea.explain({
            read: "Hier geht’s im Spiel weiter.",
            useAudio: Capkom.profile.get('useAudio'),
            html: "<button class=\" nextButton\" alt=\"Weiter\" >\nWeiter\n<i class = \"icon-arrow-right\" />\n</button>",
            script: function(element) {
              return jQuery(element).find('button').button();
            },
            after: function() {
              return _.defer(function() {
                weiterArea.remove();
                return done();
              });
            },
            ttsOptions: Capkom.getTTSOptions()
          });
        }
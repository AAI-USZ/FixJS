function(done) {
          var audioknopfArea;
          audioknopfArea = explainArea.append("<div class='audioknopf'></div>").find('.audioknopf');
          return audioknopfArea.explain({
            read: "Drücke diesen Knopf, wenn du das Vorlesen aktivieren oder deaktivieren möchtest.",
            useAudio: Capkom.profile.get('useAudio'),
            html: "<button class='tts-button' alt='Vorlesen'><i class='icon-volume-up'/></button>",
            script: function(element) {
              return jQuery(element).find('button').button();
            },
            after: function() {
              return _.defer(function() {
                audioknopfArea.remove();
                return done();
              });
            },
            ttsOptions: {
              spinnerUri: "css/spinner.gif",
              dialogTitle: "Sprechblase",
              lang: "de"
            },
            forcedClose: function(e) {
              Capkom.timeout.clear();
              return Capkom.audioOff();
            }
          });
        }
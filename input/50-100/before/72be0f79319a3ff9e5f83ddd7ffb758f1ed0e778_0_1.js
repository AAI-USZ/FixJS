function() {
            console.info("'weiter' explanation done");
            return Capkom.timeout.start(2, function() {
              return explainAudioKnopf(function() {
                console.info("'audio' explanation done");
                return done();
              });
            });
          }
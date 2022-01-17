function(element, done) {
        return Capkom.timeout.start(4, function() {
          var ttswidget, _done;
          if (Capkom.nonClickMode) {
            ttswidget = jQuery('.tts', element);
            _done = function(e) {
              done();
              return ttswidget.unbind('ttswidgetdone', _done);
            };
            ttswidget.bind('ttswidgetdone', _done);
            return ttswidget.ttswidget('talk');
          }
        });
      }
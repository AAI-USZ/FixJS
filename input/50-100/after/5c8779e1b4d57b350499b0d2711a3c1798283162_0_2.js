function(stage, panel, done) {
          console.info('autoForward');
          if (Capkom.nonClickMode()) {
            Capkom.timeout.start(2, function() {
              return Capkom.clickNext();
            });
          }
          return _.defer(function() {
            var d;
            d = done.shift();
            return typeof d === "function" ? d(stage, panel, done) : void 0;
          });
        }
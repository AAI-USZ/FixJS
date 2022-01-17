function(event, ui) {
        var autoExplain, autoForward, autoGameStart, autoread, newStage, _base1;
        jQuery(":capkom-ttswidget").each(function() {
          return jQuery(this).ttswidget('cancel');
        });
        window.location.hash = ui.tab.hash;
        Capkom.console.info(ui.tab.hash);
        newStage = _.detect(Capkom.getStages(), function(stage) {
          return stage.name === ui.tab.hash.substring(1);
        });
        if (Capkom.activeStage) {
          if (typeof (_base1 = Capkom.activeStage).hide === "function") {
            _base1.hide(jQuery("#" + Capkom.activeStage.name));
          }
        }
        Capkom.activeStage = newStage;
        autoread = function(stage, panel, done) {
          var d;
          if (Capkom.autoReadMode()) {
            return Capkom.timeout.start(2, function() {
              var ttswidget, _done;
              ttswidget = jQuery('.tts', panel);
              _done = function(e) {
                var d;
                d = done.shift();
                if (typeof d === "function") {
                  d(stage, panel, done);
                }
                return ttswidget.unbind('ttswidgetdone', _done);
              };
              ttswidget.bind('ttswidgetdone', _done);
              return ttswidget.ttswidget('talk');
            });
          } else {
            d = done.shift();
            return typeof d === "function" ? d(stage, panel, done) : void 0;
          }
        };
        autoExplain = function(stage, panel, done) {
          var d;
          if (stage.explain && Capkom.autoReadMode()) {
            return Capkom.timeout.start(2, function() {
              return stage.explain(panel, function() {
                var d;
                d = done.shift();
                return typeof d === "function" ? d(stage, panel, done) : void 0;
              });
            });
          } else {
            d = done.shift();
            return typeof d === "function" ? d(stage, panel, done) : void 0;
          }
        };
        autoGameStart = function(stage, panel, done) {
          var d;
          if (stage.startGame) {
            return Capkom.timeout.start(2, function() {
              return stage.startGame(panel, function() {
                var d;
                d = done.shift();
                return d(stage, panel, done);
              });
            });
          } else {
            d = done.shift();
            return typeof d === "function" ? d(stage, panel, done) : void 0;
          }
        };
        autoForward = function(stage, panel, done) {
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
        };
        return autoread(newStage, ui.panel, [autoExplain, autoGameStart, autoForward]);
      }
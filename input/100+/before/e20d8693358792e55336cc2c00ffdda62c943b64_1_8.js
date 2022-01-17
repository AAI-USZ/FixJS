function(event, ui) {
        var newStage, _ref10;
        window.location.hash = ui.tab.hash;
        newStage = _.detect(Capkom.getStages(), function(stage) {
          return stage.name === ui.tab.hash.substring(1);
        });
        if ((_ref10 = Capkom.activeStage) != null) {
          if (typeof _ref10.hide === "function") {
            _ref10.hide(ui.panel);
          }
        }
        Capkom.activeStage = newStage;
        if (newStage.explain && Capkom.profile.get('useAudio')) {
          return newStage.explain(ui.panel, function() {
            return typeof newStage.show === "function" ? newStage.show(ui.panel) : void 0;
          });
        } else {
          return typeof newStage.show === "function" ? newStage.show(ui.panel) : void 0;
        }
      }
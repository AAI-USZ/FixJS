function(feature) {

        var uid = feature.uid(); 
        var showUrl = app.workspace["feature-classes"][0]["link-relations"]["self"]["uri-template"]; 
        showUrl = showUrl.replace('{uid}', uid);

        self.reportLoadError(false);
        self.reportLoadComplete(false);
        var jqxhr = $.get(showUrl, function(data) {
          var elem = document.getElementById('scenario-show-container');
          ko.cleanNode(elem);
          $('#scenario-show-container').empty().append(data);
          app.scenarios.progressViewModel = null;
          clearInterval(app.timer);
          app.timer = null;
          app.scenarios.progressViewModel = new progressViewModel();
          ko.applyBindings(app.scenarios.progressViewModel, elem);
          app.scenarios.progressViewModel.checkTimer();
        })
        .error(function() { self.reportLoadError(true); })
        .complete(function() { self.reportLoadComplete(true); })
        
        selectGeographyControl.unselectAll();
        selectFeatureControl.unselectAll();

        $.each(feature.potential_fids(), function (i, fid) {
            var f = pu_layer.getFeaturesByAttribute("fid",fid)[0];
            if (f) { 
                selectGeographyControl.select(f);
            }
        });
        $.each(feature.selected_fids(), function (i, fid) {
            var f = pu_layer.getFeaturesByAttribute("fid",fid)[0];
            if (f) { 
                selectFeatureControl.select(f);
            }
        });
      }
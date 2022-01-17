function scenariosViewModel() {
  var self = this;

  // this will get bound to the active scenario
  self.selectedFeature = ko.observable(false);
  // display the form panel entirely
  self.showScenarioPanels = ko.observable();
  // display initial help
  self.showScenarioHelp = ko.observable(true);
  // display form
  self.showScenarioFormPanel = ko.observable(false);
  // display list of scenarios
  self.showScenarioList = ko.observable(true);
  // list of all scenarios, primary viewmodel
  self.scenarioList = ko.observableArray();
  // display mode
  self.dataMode = ko.observable('manage');

  // pagination config will display x items 
  // from this zero based index
  self.listStart = ko.observable(0);
  self.listDisplayCount = 9;

  // paginated list
  self.scenarioListPaginated = ko.computed(function () {
    return self.scenarioList.slice(self.listStart(), self.listDisplayCount+self.listStart());
  });

  // this list is model for pagination controls 
  self.paginationList = ko.computed(function () {
    var list = [], listIndex = 0, displayIndex = 1, listIndex = 0;
    for (listIndex=0; listIndex < self.scenarioList().length; listIndex++) {
      if (listIndex % self.listDisplayCount === 0 && Math.abs(listIndex - self.listStart()) < 5 * self.listDisplayCount) {
        list.push({'displayIndex': 1 + (listIndex/self.listDisplayCount), 'listIndex': listIndex });
      }
    }
    if (list.length < self.scenarioList().length / self.listDisplayCount) {
      list.push({'displayIndex': '...', 'listIndex': null })
      list.push({'displayIndex': '»', 'listIndex': null });

    }
    if (self.listStart() > self.listDisplayCount) {
      list.shift({'displayIndex': '&laquo;', 'listIndex': null });      
    }
    return list;
  });

  self.setListIndex = function (button, event) {
    var listStart = self.listStart();
    if (button.displayIndex === '»') {
      self.listStart(listStart + self.listDisplayCount * 5);
    } else {
    self.listStart(button.listIndex);
    }
    self.selectFeature(self.scenarioList()[button.listIndex || self.listStart()]);
  }

  self.addScenarioStart = function() {
    self.showScenarioForm('create');
    self.showScenarioList(false);
  }

  self.showScenarioForm = function(action, uid) {
    // get the form
    var formUrl;
    if (action === "create") {
      formUrl = app.workspace["feature-classes"][0]["link-relations"]["create"]["uri-template"]; 
    } else if (action === "edit") {
      formUrl = app.workspace["feature-classes"][0]["link-relations"]["edit"][0]["uri-template"]; 
      formUrl = formUrl.replace('{uid}', uid);
    }
    // clean up and show the form
    $.get(formUrl, function(data) {
      var $form = $(data).find('form');
      $form.find('input:submit').remove();
      // app.cleanupForm($form);
      $('#scenarios-form-container').empty().append(data);
      self.showScenarioFormPanel(true);
      $form.find('input:visible:first').focus();
      $form.bind('submit', function(event) {
        event.preventDefault();
      });
    })
   
  }

  self.updateScenario = function(scenario_id, isNew) {
    var updateUrl = '/features/generic-links/links/geojson/{uid}/'.replace('{uid}', scenario_id);
    $.get(updateUrl, function(data) {
      if (isNew) {
        //self.scenario_layer.addFeatures(app.geojson_format.read(data));
        self.scenarioList.unshift(ko.mapping.fromJS(data.features[0].properties));
        self.selectedFeature(self.scenarioList()[0]);
      } else {
        ko.mapping.fromJS(data.features[0].properties, self.selectedFeature());
        self.showScenarioFormPanel(false);
        self.showScenarioList(true);
      }
    });
  }

  self.associateScenario = function(scenario_id, property_id) {
    var url = "/features/folder/{folder_uid}/add/{scenario_uid}";
    url = url.replace('{folder_uid}', property_id).replace('{scenario_uid}', scenario_id);
    $.ajax({
      url: url,
      type: "POST",
      success: function(data) {
        self.updateScenario(JSON.parse(data)["X-Madrona-Select"], true);
        app.scenarios.viewModel.showScenarioFormPanel(false);
        app.scenarios.viewModel.showScenarioList(true);
        app.new_features.removeAllFeatures();
      }
    })

  }

  self.saveScenarioForm = function(self, event) {
  }

  self.OLDsaveScenarioForm = function(self, event) {
    var isNew, $dialog = $('#scenarios-form-container'),
      $form = $dialog.find('form'),
      actionUrl = $form.attr('action'),
      values = {},
      error = false;
    $form.find('input,select').each(function() {
      var $input = $(this);
      if ($input.closest('.field').hasClass('required') && $input.attr('type') !== 'hidden' && !$input.val()) {
        error = true;
        $input.closest('.control-group').addClass('error');
        $input.siblings('p.help-block').text('This field is required.');
      } else {
        values[$input.attr('name')] = $input.val();
      }
    });
    if (error) {
      return false;
    }
    if (self.modifyFeature.active) {
      values.geometry_final = values.geometry_orig = self.modifyFeature.feature.geometry.toString();
      self.modifyFeature.deactivate();
      isNew = false;
    } else {
      //values.geometry_final = values.geometry_orig = app.scenarios.geometry;
      values.geometry_orig = app.scenarios.geometry;
      isNew = true;
    }
    $form.addClass('form-horizontal');
    $.ajax({
      url: actionUrl,
      type: "POST",
      data: values,
      success: function(data, textStatus, jqXHR) {
        var scenario_uid = JSON.parse(data)["X-Madrona-Select"];
        if (isNew) {
          self.associateScenario(scenario_uid, self.property.uid());
        } else {
          self.updateScenario(scenario_uid, false);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        self.cancelAddScenario();
      }
    });
  };

  self.showDeleteDialog = function () {
    $("#scenario-delete-dialog").modal("show");
  };

  self.showLayerSwitcherDialog = function () {
    $("#layerswitcher-dialog").modal("show");
  };

  self.closeDialog = function () {
    $("#scenario-delete-dialog").modal("hide");
  };

  self.deleteFeature = function () {
    var url = "/features/generic-links/links/delete/{uid}/".replace("{uid}", self.selectedFeature().uid());
    $('#scenario-delete-dialog').modal('hide');
    $.ajax({
      url: url,
      type: "DELETE",
      success: function (data, textStatus, jqXHR) {
        self.scenarioList.remove(self.selectedFeature());
        self.selectedFeature(false);
        self.selectControl.unselectAll();
      }  
    });
  };

  // start the scenario editing process
  self.editScenario = function() {
    self.showScenarioList(false);
    self.showScenarioForm("edit", self.selectedFeature().uid());
  };

  self.cancelAddScenario = function () {
    self.showScenarioFormPanel(false);
    self.showScenarioList(true);
  }

  self.selectControl = {
      /*
       * Controls the map and display panel 
       * when features are selected
       */
      unselectAll: function() { 
        hilites.removeAllFeatures();
        // $('#scenario-show-container').empty();
      },
      select: function(feature) {

        var uid = feature.uid(); 
        var showUrl = app.workspace["feature-classes"][0]["link-relations"]["self"]["uri-template"]; 
        showUrl = showUrl.replace('{uid}', uid);

        $.get(showUrl, function(data) {
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
        
        hilites.removeAllFeatures();
        var selected_units = [];
        var unit;
        $.each(feature.selected_fids(), function (i, fid) {
            unit = pu_layer.getFeaturesByAttribute("fid",fid)[0].clone();
            if (unit) {
                selected_units.push(unit);
            } else {
                console.log("warning: fid " + fid + " is not valid");
            }
        });
        hilites.addFeatures(selected_units);
      }
   }

  self.selectFeature = function(feature, event) {
    self.selectControl.unselectAll();
    self.selectControl.select(feature);
    self.selectedFeature(feature); 
  }

  self.selectFeatureById = function (id) {
    var pageSize = self.scenarioList().length / self.listDisplayCount;
    $.each(self.scenarioList(), function (i, feature) {
      if (feature.uid() === id) {
        // set list start to first in list page      
        self.listStart(Math.floor(i / self.listDisplayCount) * self.listDisplayCount);
        self.selectedFeature(this);
      }
    });
  }

  self.reloadScenarios = function(property) {
    console.log("reloadScenarios");
    self.scenarioList.removeAll();
    self.loadScenarios();
  }

  self.loadViewModel = function (data) {
    self.scenarioList($.map(data.features, function (feature, i) {
      return ko.mapping.fromJS(feature.properties);
    }));
    // Don't bother selecting the first feature
    //self.selectFeature(self.scenarioList()[0]);
  }

  self.loadScenarios = function() {
    var process = function(data) {
      if (data.features && data.features.length) {
        self.loadViewModel(data);
      } else {
        console.log("NO DATA");
      }
    };
    $.get('/seak/scenarios.geojson', process);
  }

  return self;
}
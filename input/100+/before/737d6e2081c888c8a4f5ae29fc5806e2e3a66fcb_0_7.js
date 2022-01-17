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
  self.scenarioLoadError = ko.observable(false);
  self.scenarioLoadComplete = ko.observable(false);
  self.reportLoadError = ko.observable(false);
  self.reportLoadComplete = ko.observable(false);
  self.planningUnitsLoadError = ko.observable(false);
  self.planningUnitsLoadComplete = ko.observable(false);
  self.formLoadError = ko.observable(false);
  self.formLoadComplete = ko.observable(true);
  self.formSaveError = ko.observable(false);
  self.formSaveComplete = ko.observable(true);
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

  self.switchMode = function(mode) {
    self.dataMode(mode);
    self.selectedFeature(false);
    self.showScenarioList(true);
    self.loadScenarios();
  }
  
  // this list is model for pagination controls 
  self.paginationList = ko.computed(function () {
    var list = [], listIndex = 0, displayIndex = 1;
    for (listIndex=0; listIndex < self.scenarioList().length; listIndex++) {
      if (listIndex % self.listDisplayCount === 0 && Math.abs(listIndex - self.listStart()) < 5 * self.listDisplayCount) {
        list.push({'displayIndex': 1 + (listIndex/self.listDisplayCount), 'listIndex': listIndex });
      }
    }
    if (list.length < self.scenarioList().length / self.listDisplayCount) {
      list.push({'displayIndex': '...', 'listIndex': null });
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
  };


  self.showScenarioForm = function(action, uid) {
    var formUrl;
    if (action === "create") {
      formUrl = app.workspace["feature-classes"][0]["link-relations"]["create"]["uri-template"]; 
    } else if (action === "edit") {
      formUrl = app.workspace["feature-classes"][0]["link-relations"]["edit"][0]["uri-template"]; 
      formUrl = formUrl.replace('{uid}', uid);
    }

    // clean up and show the form
    var jqxhr = $.get(formUrl, function(data) {
      $('#scenarios-form-container').empty().append(data);
      var $form = $('#scenarios-form-container').find('form#featureform');
      $form.find('input:submit').remove();
      self.showScenarioFormPanel(true);
    })
    .success( function() {
        selectFeatureControl.unselectAll();
        selectGeographyControl.activate();
        pu_layer.styleMap.styles.default.defaultStyle.display = true;
        self.showScenarioList(false);
        self.selectedFeature(false);
        self.showScenarioList(false);

        function setTargetsPenalties(id, uivalue) {
            // Sets the targets and penalties based on the single slider value
            // slider val is 0 to 100 while targets/penalties are 0 to 1
            // Assume that the slider always tracks target directly (ie 0.75 target == 75 slider)
            // The penalty MAY need to be variable depending on the target  
            $( "#penalty---" + id ).val( uivalue / 100.0 );
            $( "#target---" + id ).val( uivalue / 100.0 );
            //$( "#sliderdisplay---" + id).text( uivalue );
        }

        $.each( $(".slider-range"), function(k, sliderrange) {
            var id = $(sliderrange).attr('id');
            id = id.replace("sliderrange---", '');
            $(sliderrange).slider({
                range: "min",
                value: 0,
                min: 0,
                max: 100,
                slide: function( event, ui ) {
                    setTargetsPenalties(id, ui.value);
                }
            })
        });

        // If we're in EDIT mode, set the form values 
        if ($('#id_input_targets').val() && 
            $('#id_input_penalties').val() && 
            $('#id_input_relativecosts').val() && 
            $('#id_input_geography').val()) { 
                
            // Reset to zeros 
            $.each( $('.targetvalue'), function(k, target) { $(target).val(0); });
            $.each( $('.penaltyvalue'), function(k, penalty) { $(penalty).val(0); });
            $.each( $('.costvalue'), function(k, cost) { $(cost).removeAttr('checked'); });

            // Select and apply geography
            var in_geog = JSON.parse($('#id_input_geography').val());
            $.each(in_geog, function (i, fid) {
                var f = pu_layer.getFeaturesByAttribute("fid",fid)[0];
                if (!f) {
                    console.log("warning: fid " + fid + " is not valid");
                }
                selectGeographyControl.select(f);
            });
             
            // Apply Costs
            var in_costs = JSON.parse($('#id_input_relativecosts').val());
            $.each(in_costs, function(key, val) {
                if (val > 0) {
                    $("#cost---" + key).attr('checked','checked')
                } else {
                    $("#cost---" + key).removeAttr('checked')
                }
            });

            // Apply Targets and Penalties
            var in_targets = JSON.parse($('#id_input_targets').val());
            $.each(in_targets, function(key, val) {
                $("#target---" + key).val(val);
                // Assume slider tracks target
                $("#sliderrange---" + key).slider("value", val * 100);  
                //$("#sliderdisplay---" + key).text(val * 100);
            });
            var in_penalties = JSON.parse($('#id_input_penalties').val());
            $.each(in_penalties, function(key, val) {
                $("#penalty---" + key).val(val);
            });
            
       }; // end EDIT mode
    })
    .error( function() { self.formLoadError(true); } )
    .complete( function() { self.formLoadComplete(true); } )
  };

  self.saveScenarioForm = function(self, event) {
        var targets = {};
        var penalties = {};
        var costs = {};
        var geography_fids = [];
        var totaltargets = 0;
        var totalpenalties = 0;
        var totalfids = 0;

        // Get geography constraints
        $.each(pu_layer.selectedFeatures, function(k, v) { 
            geography_fids.push(v.data.fid); 
            totalfids += 1;
        });
        // Get targets
        $("#form-cfs input.targetvalue").each( function(index) {
            var xid = $(this).attr("id");
            var id = "#" + xid;
            xid = xid.replace(/^target---/,''); //  Remove preceding identifier
            xid = xid.replace(/---$/,''); // Remove trailing ---
            targets[xid] = parseFloat($(id).val());
            totaltargets += parseFloat($(id).val());
        });
        // Get penalties 
        $("#form-cfs input.penaltyvalue").each( function(index) {
            var xid = $(this).attr("id");
            var id = "#" + xid;
            xid = xid.replace(/^penalty---/,''); 
            xid = xid.replace(/---$/,'');
            penalties[xid] = parseFloat($(id).val());
            totalpenalties += parseFloat($(id).val());
        });
        // Initialize costs to zero
        $('#form-costs input:checkbox.costvalue').each( function(index) {
            var xid = $(this).attr("id");
            xid = xid.replace(/^cost---/,'');
            costs[xid] = 0;
        });
        // Set the *checked* costs to 1
        $('#form-costs input:checkbox.costvalue:checked').each( function(index) {
            var xid = $(this).attr("id");
            xid = xid.replace(/^cost---/,'');
            costs[xid] = 1;
        });

        // Set the form values (note that .html() doesnt change)
        var frm = $('form#featureform');
        $(frm).find('textarea#id_input_targets').val( JSON.stringify(targets) ); 
        $(frm).find('textarea#id_input_penalties').val( JSON.stringify(penalties) );
        $(frm).find('textarea#id_input_relativecosts').val( JSON.stringify(costs) );
        $(frm).find('textarea#id_input_geography').val( JSON.stringify(geography_fids) );

        if (totalfids == 0) {
            alert("Please select geography; complete Step 1");
            $("#formtabs a[href='#geographytab']").tab('show');
        } else if ($(frm).find('input[name="name"]').val() === '') {
            alert("Please provide a name; complete Step 2");
            $("#formtabs a[href='#generaltab']").tab('show');
            $(frm).find('input[name="name"]').focus();
        } else if (totalpenalties == 0 || totaltargets == 0) {
            alert("Please set goals for at least one target; complete Step 3");
            $("#formtabs a[href='#speciestab']").tab('show');
        } else {
            // GO .. we are clear to submit the form
            var values = {};
            var actionUrl = $(frm).attr('action');
            $(frm).find('input,select,textarea').each(function() {
                values[$(this).attr('name')] = $(this).val();
            });

            // Submit the form
            self.formSaveComplete(false);
            self.formSaveError(false);
            var scenario_uid; 
            var jqxhr = $.ajax({
                url: actionUrl,
                type: "POST",
                data: values
            })
            .success( function(data, textStatus, jqXHR) {
                var d = JSON.parse(data);
                scenario_uid = d["X-Madrona-Select"];
                self.loadScenarios(scenario_uid);
                self.cancelAddScenario(); // Not acutally cancel, just clear 
            })
            .error( function(jqXHR, textStatus, errorThrown) {
                console.log("ERROR", errorThrown, textStatus);
                self.formSaveError(true);
            })
            .complete( function() { 
                self.formSaveComplete(true);
            });
        };
  };

  self.showDeleteDialog = function () {
    $("#scenario-delete-dialog").modal("show");
  };

  self.showDownloadDialog = function () {
    $("#scenario-download-dialog").modal("show");
  };

  self.deleteScenario = function () {
    var url = "/features/generic-links/links/delete/{uid}/".replace("{uid}", self.selectedFeature().uid());
    $('#scenario-delete-dialog').modal('hide');
    $.ajax({
      url: url,
      type: "DELETE",
      success: function (data, textStatus, jqXHR) {
        self.scenarioList.remove(self.selectedFeature());
        self.selectedFeature(false);
        self.showScenarioList(true);
        self.listStart(0);
        self.selectControl.unselectAll();
      }  
    });
  };

  // start the scenario editing process
  self.editScenario = function() {
    self.formLoadError(false);
    self.formLoadComplete(false);
    self.showScenarioForm("edit", self.selectedFeature().uid());
  };

  self.addScenarioStart = function() {
    self.formLoadError(false);
    self.formLoadComplete(false);
    self.showScenarioForm('create');
  };

  self.cancelAddScenario = function () {
    selectGeographyControl.unselectAll();
    selectGeographyControl.deactivate();
    pu_layer.styleMap.styles.default.defaultStyle.display = "none";
    pu_layer.redraw();
    self.showScenarioFormPanel(false);
    self.showScenarioList(true);
    self.formSaveError(false);
  };

  self.selectControl = {
      /*
       * Controls the map and display panel 
       * when features are selected
       */
      unselectAll: function() { 
        // $('#scenario-show-container').empty();
      },
      select: function(feature) {

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
   };

  self.selectFeature = function(feature, event) {
    if (!self.planningUnitsLoadComplete()) { return false; }
    self.selectControl.unselectAll();
    self.selectControl.select(feature);
    self.selectedFeature(feature); 
    bbox = feature.bbox();
    if (bbox && bbox.length === 4) {
        map.zoomToExtent(bbox);
    }
    self.showScenarioList(false);
  };

  self.selectFeatureById = function (id) {
    var pageSize = self.scenarioList().length / self.listDisplayCount;
    $.each(self.scenarioList(), function (i, feature) {
      if (feature.uid() === id) {
        // set list start to first in list page      
        self.listStart(Math.floor(i / self.listDisplayCount) * self.listDisplayCount);
        self.selectedFeature(this);
      }
    });
  };

  self.loadViewModel = function (data) {
    // load the whole enchilada
    if (data.features && data.features.length) {
        self.scenarioList($.map(data.features, function (feature, i) {
            return ko.mapping.fromJS(feature.properties);
        }));
    } else {
        self.scenarioList.removeAll(); 
    }
  };

  self.updateScenario = function (data) {
        // Remove it first if it already exists
        var theUid = data.features[0].properties.uid;
        var theScenario = self.getScenarioByUid(theUid);
        if (theScenario) {
            self.scenarioList.remove(theScenario);
        }
          
        self.scenarioList.unshift(ko.mapping.fromJS(data.features[0].properties));
        self.selectedFeature(self.scenarioList()[0]);
  }

  self.loadScenarios = function(scenario_uid) {
    self.scenarioLoadComplete(false);
    self.scenarioLoadError(false);
    var url;
    if (scenario_uid) {
        // TODO  get url from workspace
        url = '/features/generic-links/links/geojson/' + scenario_uid + '/';
        handler = function(data) { self.updateScenario(data); }
    } else {
        if (self.dataMode() == 'manage') {
            url = '/seak/scenarios.geojson';
        } else if (self.dataMode() == 'shared') {
            url = '/seak/scenarios_shared.geojson';
        } else {
            console.log("ERROR: dataMode must be either manage or shared");
        }
        handler = function(data) { self.loadViewModel(data); }
    }

    var jqhxr = $.get(url, handler) 
    .success( function() { 
        if (scenario_uid) {
            var theScenario = self.getScenarioByUid(scenario_uid);
            self.selectFeature(theScenario);
        } 
     })
    .error(function() { self.scenarioLoadError(true); })
    .complete(function() { 
        self.scenarioLoadComplete(true); 
        $('.scenario-row').tooltip()
    })

  };

  self.getScenarioByUid = function(uid) {
    var theScenario = false;
    $.each(self.scenarioList(), function(i, scenario) {
        if (scenario.uid() === uid) {
            theScenario = scenario;
            return false;
        }
    });
    return theScenario;
  };

  self.backToScenarioList = function() {
    selectFeatureControl.unselectAll();
    self.selectedFeature(false);
    self.showScenarioList(true);
  };

  self.downloadScenario = function() {
    var uids = [self.selectedFeature().uid()];
    var frm = $('form#download-array-form');
    $(frm).find('input:checkbox').each( function(k,v) { 
        if ($(v).attr('checked')) { 
            uids.push( $(v).attr('value') ); 
        }
    });
    var ws = new madrona.features.workspace(app.workspace);
    var shpTemplate = ws.actions.getByTitle("Shapefile")[0];
    var shpUrl = shpTemplate.getUrl(uids);
    $('#download-iframe').attr('src', shpUrl);
    $("#scenario-download-dialog").modal("hide");
  };

  self.copyScenario = function() {
    var uids = [self.selectedFeature().uid()];
    var ws = new madrona.features.workspace(app.workspace);
    var uriTemplate = ws.actions.getByTitle("Copy")[0];
    var copyURL = uriTemplate.getUrl(uids);
    var jqxhr = $.ajax({
        url: copyURL,
        type: "POST"
    })
    .success( function(data, textStatus, jqXHR) {
        self.selectedFeature(false);
        var d = JSON.parse(data);
        scenario_uid = d["X-Madrona-Select"];
        self.loadScenarios(scenario_uid);
        self.cancelAddScenario(); // Not acutally cancel, just clear 
    })
    .error( function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", errorThrown, textStatus);
    })
    .complete( function() { 
        console.log('copy complete');
    });
    
  };

  self.showShareDialog = function () {
    var uids = [self.selectedFeature().uid()];
    var ws = new madrona.features.workspace(app.workspace);
    var uriTemplate = ws.actions.getByTitle("Share")[0];
    var shareURL = uriTemplate.getUrl(uids);
    var jqxhr = $.ajax({
        url: shareURL,
        type: "GET",
    })
    .success( function(data, textStatus, jqXHR) {
        var d = $(data).filter('div');
        $(d).find('div.form_controls').remove();
        $("#share-form-div").empty().append(d);
        $("a.show_members").click(function() { 
            var members = $(this).parent().find('ul.member_list');
            if(members.is(':visible')){
                $(this).find('span').text('show members');
            }else{
                $(this).find('span').text('hide members');
            }
            members.toggle(300);
            return false;
        });
    })
    .error( function(jqXHR, textStatus, errorThrown) {
        $("#share-form-div").html("<div id=\"info info-alert\">Could not load share form.</div>");
        console.log("ERROR", errorThrown, textStatus);
    })
    .complete( function() { 
        $("#scenario-share-dialog").modal("show");
    });
  };
 
  self.shareScenario = function() {
    var uids = [self.selectedFeature().uid()];
    var ws = new madrona.features.workspace(app.workspace);
    var uriTemplate = ws.actions.getByTitle("Share")[0];
    var shareURL = uriTemplate.getUrl(uids);
    var postData = $("form#share").serialize(); 
    var jqxhr = $.ajax({
        url: shareURL,
        type: "POST",
        data: postData
    })
    .success( function(data, textStatus, jqXHR) {
        var d = JSON.parse(data);
        scenario_uid = d["X-Madrona-Select"];
        self.loadScenarios(scenario_uid);
        self.cancelAddScenario(); // Not acutally cancel, just clear 
    })
    .error( function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", errorThrown, textStatus);
    })
    .complete( function() { 
        $("#scenario-share-dialog").modal("hide");
    });
    
  };
  return self;
}
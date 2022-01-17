function (mapId, workspaceId) {
    kiezatlas.cityMapId = mapId;
    kiezatlas.workspaceId = workspaceId;
    if (kiezatlas.markers != undefined) {
      kiezatlas.clearMarkers();
    }
    jQuery("img.loading").css("display", "block");
    console.log("showing loading bar => " + jQuery("img.loading").css("display"));
    kiezatlas.loadCityMapTopics(mapId, workspaceId, function () {
      kiezatlas.setupLeafletMarkers();
      kiezatlas.setToCurrentBounds();
      kiezatlas.getUsersLocation();
    });
    // ### FIXMEs mvoe GUI related manipulations into guiSetup/renderFunctions
    kiezatlas.closeInfoContainer(); // close info and  show nav
    // 
    if (cityMapEhrenamtId != undefined && cityMapEventId != undefined) {
      if (kiezatlas.cityMapId == cityMapEhrenamtId) {
        jQuery("#go-do").addClass("selected");
        jQuery("#go-event").removeClass("selected");
      } else if (kiezatlas.cityMapId == cityMapEventId) {
        jQuery("#go-event").addClass("selected");
        jQuery("#go-do").removeClass("selected");
      }
    }
    // initiate current citymap state
    // var newLink = baseUrl + "?map=" + mapId;
    // kiezatlas.pushHistory({ "name": "loaded", "parameter": [ mapId, workspaceId ] }, newLink);
    kiezatlas.hideKiezatlasControl();
  }
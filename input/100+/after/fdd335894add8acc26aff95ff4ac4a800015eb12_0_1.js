function() {
  var that = this;

  mapView.previousZoom   = window.map.getZoom();
  mapView.previousCenter = window.map.getCenter();

  var
  properties        = that.properties,
  title             = properties.title,
  approvalDate      = properties.approval_date,
  fixedApprovalDate = properties.approval_date,
  moreURL           = config.MIF_URL + properties.nexso_code,

  solutionName      = properties.solution_name,
  solutionURL       = properties.solution_url,

  agencyName        = properties.agency_name,
  agencyURL         = properties.agency_url,

  nexsoCode         = properties.nexso_code,

  topicName         = properties.topic_name,
  location          = properties.location_verbatim,
  budget            = properties.budget;

  function onInfowindowClick(e) {
    if (e) {
      e.preventDefault();
    }

    Timeline.hide();

    Aside.hide(function() {
      that.onHiddenAside(that);
    });

    mapView.removeLines(mapView.currentProject);
    mapView.showLines(that.properties.nexso_code);

  }


    Infowindow.setContent({ name: title, overlayType: "project", agencyName: agencyName, solution_name: solutionName, solution_url: solutionURL });
    Infowindow.setCallback(onInfowindowClick);
    Infowindow.open(that.latlng_);

}
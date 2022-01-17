function enterFinishedProfileUI() {
  var finishedProfilePaneBackgroundCover = document.createElement("div");
  finishedProfilePaneBackgroundCover.className = "finishedProfilePaneBackgroundCover";

  var finishedProfilePane = document.createElement("div");
  finishedProfilePane.className = "finishedProfilePane";

  gBreadcrumbTrail = new BreadcrumbTrail();
  finishedProfilePane.appendChild(gBreadcrumbTrail.getContainer());

  gHistogramView = new HistogramView();
  finishedProfilePane.appendChild(gHistogramView.getContainer());

  gDiagnosticBar = new DiagnosticBar();
  finishedProfilePane.appendChild(gDiagnosticBar.getContainer());

  gTreeManager = new ProfileTreeManager();
  finishedProfilePane.appendChild(gTreeManager.getContainer());

  gPluginView = new PluginView();
  finishedProfilePane.appendChild(gPluginView.getContainer());

  gMainArea.appendChild(finishedProfilePaneBackgroundCover);
  gMainArea.appendChild(finishedProfilePane);

  gBreadcrumbTrail.add({
    title: "Complete Profile",
    enterCallback: function () {
      gSampleFilters = [];
      filtersChanged();
    }
  });
}
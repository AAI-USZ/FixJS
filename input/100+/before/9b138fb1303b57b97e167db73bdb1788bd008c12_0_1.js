function enterFinishedProfileUI() {
  var finishedProfilePaneBackgroundCover = document.createElement("div");
  finishedProfilePaneBackgroundCover.className = "finishedProfilePaneBackgroundCover";

  var finishedProfilePane = document.createElement("table");
  var currRow;
  finishedProfilePane.style.height = "100%";
  finishedProfilePane.border = "0";
  finishedProfilePane.cellPadding = "0";
  finishedProfilePane.cellSpacing = "0";
  finishedProfilePane.borderCollapse = "collapse";
  finishedProfilePane.className = "finishedProfilePane";

  gBreadcrumbTrail = new BreadcrumbTrail();
  currRow = finishedProfilePane.insertRow(0);
  currRow.insertCell(0).appendChild(gBreadcrumbTrail.getContainer());

  gHistogramView = new HistogramView();
  currRow = finishedProfilePane.insertRow(1);
  currRow.insertCell(0).appendChild(gHistogramView.getContainer());

  gDiagnosticBar = new DiagnosticBar();
  currRow = finishedProfilePane.insertRow(2);
  currRow.insertCell(0).appendChild(gDiagnosticBar.getContainer());

  var dummyDiv = document.createElement("div");
  dummyDiv.style.width = "100%";
  dummyDiv.style.height = "100%";

  gTreeManager = new ProfileTreeManager();
  currRow = finishedProfilePane.insertRow(3);
  currRow.style.height = "100%";
  var cell = currRow.insertCell(0);
  cell.appendChild(dummyDiv);
  dummyDiv.appendChild(gTreeManager.getContainer());

  gPluginView = new PluginView();
  //currRow = finishedProfilePane.insertRow(4);
  dummyDiv.appendChild(gPluginView.getContainer());

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
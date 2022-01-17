function updateTocForTab(tab, panel) {
  //console.log(functionPageBucketId);
  //console.log("updateTocForTab called");

  // Hide the view toggle buttons if this isn't the functions or categories panel
  if (panel.id == categoriesPanelId || panel.id == functionsPanelId)
  {
    // Show the radio buttons
    $("#function_view_buttons").show();

    // Ensure the correct radio button is checked (e.g. when first loading a page that's only in the categories TOC)
    var correctRadioButtonValue = (panel.id == functionsPanelId) ? "by_name" : "by_category";
    var radioButton = $("input[name=function_view][value="+correctRadioButtonValue+"]");
    radioButton.attr("checked","checked");

    // Show the tab selected by the radio button; hide the other
    var functionsTab  = $("#tab_bar a[href=#"+ functionsPanelId+"]").parent("li");
    var categoriesTab = $("#tab_bar a[href=#"+categoriesPanelId+"]").parent("li");

    if (panel.id == functionsPanelId) {
      functionsTab.show();
      categoriesTab.hide();
    }
    else {
      functionsTab.hide();
      categoriesTab.show();
    }
  }
  else
    $("#function_view_buttons").hide();

  // When the user clicks on the "Categories" tab when on a function or list page
  if (panel.id == categoriesPanelId && functionPageBucketId !== "") {
    var tocSection = $("#" + functionPageBucketId, panel);

    //console.log(tocSection);

    loadTocSection(tocSection);
    waitToShowInTOC(tocSection);
  }
  else {
    var tocSectionLink = $(tocSectionLinkSelector, panel);
    var tocSection = tocSectionLink.parent();

    if (tocSection.length) {
      //console.log("Loading tocSection");
      //console.log(tocSection);
      loadTocSection(tocSection);
      waitToShowInTOC(tocSection);
    }
  }
}
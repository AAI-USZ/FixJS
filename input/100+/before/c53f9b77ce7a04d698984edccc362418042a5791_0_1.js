function initializeTOC() {
  // Load the TOC section for the current page
  var tocSection = $(tocSectionLinkSelector).first().parent();

  // Switch to the relevant tab
  var current_tab_index = $("#toc_tabs").tabs('option', 'selected');
  var new_tab_index = tocSection.parents(".tabbed_section").prevAll(".tabbed_section").length;

  /*
  console.log(tocSectionLinkSelector);
  console.log(tocSection);
  console.log(current_tab_index);
  console.log(new_tab_index);
  */

  if (current_tab_index !== new_tab_index) {
    // this triggers updateTocForTab for us
    $("#toc_tabs").tabs('select',new_tab_index);
  }
  else { // otherwise, we have to do it ourselves
    var tab = $("#toc_tabs .tab_link").eq(current_tab_index);
    var panel = $("#toc_tabs .ui-tabs-panel:visible");

    /*
    console.log(tab);
    console.log(panel);
    */

    //console.log("Calling updateTocForTab from initializeTOC");
    updateTocForTab(tab, panel);
  }
}
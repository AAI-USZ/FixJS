function toggleFunctionsView(input) {
  // Switch to the relevant tab
  var current_tab_index = $("#toc_tabs").tabs('option', 'selected');
  var new_tab_index = (input.val() === 'by_name') ? functionPanelIndex : categoriesPanelIndex;
  $("#toc_tabs").tabs('select',new_tab_index);
  //console.log("Toggling function view...");
}
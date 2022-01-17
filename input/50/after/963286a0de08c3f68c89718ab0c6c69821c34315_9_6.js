function lists_change_color(tableRow,highLight) {
  if (highLight) {
    $(tableRow).parents("tr").addClass("highlightProjectForPreselection");
  } else {
    $(tableRow).parents("tr").removeClass("highlightProjectForPreselection");
  }
}
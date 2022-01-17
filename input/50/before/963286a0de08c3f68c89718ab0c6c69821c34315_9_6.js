function lists_change_color(tableRow,highLight) {
  if (highLight) {
    $(tableRow).parents("tr").addClass("highlightPctForPreselection");
  } else {
    $(tableRow).parents("tr").removeClass("highlightPctForPreselection");
  }
}
function showInTOC(a) {
  //console.log(a);
  $("#api_sub a.selected").removeClass("selected");
  $("#api_sub a.currentPage").removeClass("currentPage"); // e.g., arriving via back button

  var items = a.addClass("selected").parents("ul, li").add( a.nextAll("ul") ).show();

  loadTocSection(0,a.parent()); // If this is a TOC section that needs loading, then load it
                                // e.g., when PJAX is enabled and the user clicks the link

  items.each(function(index) {
    expandSubTree($(this));
  });

  scrollTOC();
}
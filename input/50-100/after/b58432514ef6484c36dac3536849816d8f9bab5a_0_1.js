function() {
  $('#tab').jqGrid('setGridHeight', $(window).height()/2-30);
  $('#map').height($(window).height()-$('#table').height()-3);
  hell.map.invalidateSize();
  $('#tab').jqGrid('setGridWidth', $(window).width());
}
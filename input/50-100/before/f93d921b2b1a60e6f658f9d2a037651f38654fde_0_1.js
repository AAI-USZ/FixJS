function() {
  $('#tabt').jqGrid('setGridHeight', $(window).height()/2-30);
  $('#map').height($(window).height()-$('#tab').height()-3);
  hell.map.invalidateSize();
  $('#tabt').jqGrid('setGridWidth', $(window).width());
}
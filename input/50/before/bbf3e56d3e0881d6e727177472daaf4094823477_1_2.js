function() {
  deleteGraph($(this).parent().attr('id'));
  clearGraphs();
  setTimeout(renderGraphs, 200);
  return false;
}
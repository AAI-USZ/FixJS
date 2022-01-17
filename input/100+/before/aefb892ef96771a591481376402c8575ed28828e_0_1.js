function show_tooltip(graph, page_x, page_y, contents) {
  var graph_pos = graph.position();
  var x = page_x - graph_pos.left;
  var y = page_y - graph_pos.top;
  var tooltip = $(contents).css({
    'top': y - 20, 'left': x + 5
  }).appendTo(graph).fadeIn(200);
  tooltip.children("img").click(function () {
    $(this).parent().remove();
  });
}
function show_tooltip(x, y, contents) {
  var tooltip = $(contents).css({
    'top': y + 5, 'left': x + 5
  }).appendTo("body").fadeIn(200);
  tooltip.children("img").click(function () {
    $(this).parent().remove();
  });
}
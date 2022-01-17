function() {
  if (!active || $(this).hasClass('annotated')) {
    return;
  }
  resetMatchedElement();
  ancestor = $(this).closest("[id]");
  matchedElement = $(this).first();
  originalBgColor = $(matchedElement).css('background-color');
  $(matchedElement).css('background-color', 'yellow');
  $(matchedElement).bind('click.annotator', function(event) {
    event.stopPropagation();
    event.preventDefault();
    self.port.emit('show',
      [
        document.location.toString(),
        $(ancestor).attr("id"),
        $(matchedElement).text()
      ]
   );
  });
}
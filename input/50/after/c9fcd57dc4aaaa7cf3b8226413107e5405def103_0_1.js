function() {
  var mySelector = 'span.dashboard#' + $(this).attr('id') + ' img.close';
  $(mySelector).toggleClass('hidden');
}
function() {
  var mySelector = 'span.dashboard#' + $(this).attr('id') + ' img';
  $(mySelector).toggleClass('hidden');
}
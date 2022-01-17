function(event) {
  var $el = $(event.target);
  $el.addClass('is-active');
  $el.siblings().removeClass('is-active');
  $('.resizeable')
    .animate({ width: $el.data('width') }, 250, function(el) {
      var $iframe = $(this).find('iframe').first();
      $iframe.animate({ height: getContentHeight($iframe[0]) }, 100);
    });
}
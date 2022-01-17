function() {
  var $section = $('.page-template-page-section-php');
  if ($section.length > 0) {
    selector_height = $section.find('.section-selector').outerHeight();
    content_height = $section.find('.text-article').outerHeight();
    if (selector_height < content_height) {
      $section.find('.section-selector')
        .css('position', 'absolute');
    }
  }
}
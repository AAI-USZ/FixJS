function() {
  var $section = $('.page-template-page-section-php');
  console.log('app.js laodes');
  if ($section.length > 0) {
    selector_height = $section.find('.section-selector').outerHeight();
    content_height = $section.find('.text-article').outerHeight();
    if (selector_height < content_height) {
      $section.find('.section-selector')
        .css('position', 'absolute');
    }
  }
}
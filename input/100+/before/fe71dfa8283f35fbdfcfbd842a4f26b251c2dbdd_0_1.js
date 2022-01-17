function hookTableOfContentsToggle() {
  $('.indexpage li .toc-toggle').each( function() {
    $(this).click( function() {
      $(this).toggleClass('open');
    });

    var section = $(this).next();

    $(this).click( function() {
      section.slideToggle();
    });
  });
}
function() {
    var heading = $(location.hash);

    if (heading.length == 0) {
      pages.first().show();
      return;
    }

    if (heading.is(":visible")) {
      return;
    }

    pages.hide();
    heading.parents(".page").show();
    $('html, body').animate({scrollTop:heading.offset().top}, 0);
  }
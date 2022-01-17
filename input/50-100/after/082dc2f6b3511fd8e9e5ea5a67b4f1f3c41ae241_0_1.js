function() {
    $('#rightbar-actions .icon-arrow-left').removeClass('icon-arrow-left').addClass('icon-arrow-right');
    $('div#rightbar').show();
    $('div#rightbar').animate({
      right: 0,
      opacity: 100
    }, animationSpeed);
    $('div#content').animate({
      right: 251
    }, animationSpeed, function() {
      return setUpMapDimensions();
    });
    return this;
  }
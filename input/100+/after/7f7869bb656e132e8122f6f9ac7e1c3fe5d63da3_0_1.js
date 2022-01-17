function() {
  var lastScrollY = 0;
  var ticking = false;
  var wrapper = $('.wrapper');
  var nav = wrapper.find('> nav');

  var update = function() {
    if (lastScrollY > 230) {
      nav.css({position: 'fixed'});
    } else {
      nav.css({position: 'absolute'});
    }
    ticking = false;
  };

  var requestTick = function() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  var onScroll = function() {
    lastScrollY = window.scrollY;
    requestTick();
  };

  $(window).on('scroll', onScroll);
}
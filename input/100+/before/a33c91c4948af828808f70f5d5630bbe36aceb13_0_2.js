function () {
  // disable basic functionality
  $('#occheader, .headernav').removeClass('basic');

  // trackers & units
  var showHeader = false; // Initially, it SHOULD NOT be shown
  var visible = false; // Initially, it IS NOT shown
  var hideDelay = 750;
  var hideDelayTimer = null;
  var openHeight = 275;
  var closedHeight = 48;

  // mouseenter event opens drawer
  $('#home_top').mouseenter(function() {
    if (hideDelayTimer) clearTimeout(hideDelayTimer);
    if (visible == true) { // don't do anything if it's already visible
      return;
    }
    else {
      showHeader = true;
      if (showHeader == true && visible == false) {
        headerOpen();
      }
    }
  });

  // mouseleave event closes drawer after a delay
  $('#home_top').mouseleave(function() {
    // reset the timer if we get fired again - avoids double animations
    if (hideDelayTimer) clearTimeout(hideDelayTimer);
    // store the timer so that it can be cleared in the mouseover if required
    hideDelayTimer = setTimeout(function () {
      hideDelayTimer = null;
      showHeader = false;
      if (showHeader == false && visible == true) {
        headerClose();
      }
    }, hideDelay);
  });

  function headerOpen () {
    $('#occheader, .headernav').animate({height: openHeight + 'px'}, 150);
    visible = true;
  }
  function headerClose () {
    $('#occheader, .headernav').animate({height: closedHeight + 'px',}, 150);
    visible = false;
  }
}
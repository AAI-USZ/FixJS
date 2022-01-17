function() {

// Animate quicklinks #panel open & close
    $('#panel').removeClass('basic'); // JQuery takes over, #panel.basic:hover-to-show is removed
    $('#panel').addClass('closed');
    $('#toggle_open').click(function() {
      $('#subpanel').animate({height:'show'}, 300, function() {
        $('#panel').removeClass('closed');
        $('#panel').addClass('opened');
      });
    });
    $('#toggle_close').click(function() {
      $('#subpanel').animate({height:'hide'}, 300, function() {
        $('#panel').removeClass('opened');
        $('#panel').addClass('closed');
      });
    });

// Take current Google Search query and use it to search within the scope of a different website
// to add a new option, modify the subdomain / subdirectory, and modify the CXkey (created on google webmaster tools)
  occSwitchSearch = function(NewSite) {
    loc = window.location.href;
    qkey = parseUri(loc).queryKey;
    qHold = $(qkey).attr("q");
    if (NewSite == 'www') {
      window.location.href="http://www.sunyocc.edu/search.aspx?cx=009247214289687445570%3A4z5fbtg2lek&cof=FORID%3A11&ie=UTF-8&sa=Search&q=" + qHold;
    }
    else if (NewSite == 'wwwold') {
      window.location.href="http://www.sunyocc.edu/searchresult.aspx?cx=009247214289687445570%3A4z5fbtg2lek&cof=FORID%3A11&ie=UTF-8&sa=Search&q=" + qHold;
    }
    else if (NewSite == 'students') {
      window.location.href="http://students.sunyocc.edu/search.aspx?cx=012429996574113949521%3Az7uv6wcw71e&cof=FORID%3A11&ie=UTF-8&sa=Search&q=" + qHold;
    }
    else if (NewSite == 'admission') {
      window.location.href="http://admission.sunyocc.edu/search.aspx?cx=009247214289687445570%3As8i2fdwbink&cof=FORID%3A11&ie=UTF-8&sa=Search&q=" + qHold;
    }
  };



// Open/Close Animation for Site Header Navigation "Drawer"
  // disable basic functionality
  $('#occheaderbg, .headernav').removeClass('basic');

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
    $('#occheaderbg, .headernav').animate({height: openHeight + 'px'}, 150);
    visible = true;
  }
  function headerClose () {
    $('#occheaderbg, .headernav').animate({height: closedHeight + 'px'}, 150);
    visible = false;
  }
}
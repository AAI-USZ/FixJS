function() {
    var height = $(window).height() - $("header").outerHeight() - $("footer").outerHeight();
    $("#vAlign").css({ "height": height });


    // On the manage page, the content element sometimes does not take up the
    // full height of the screen, leaving the footer to float somewhere in the
    // middle.  To compensate, force the min-height of the content so that the
    // footer remains at the bottom of the screen.

    var paddingTop = 0, paddingBottom = 0;

    if(paddingAddedToMinHeight()) {
      paddingTop = parseInt($("#content").css("padding-top") || 0, 10);
      paddingBottom = parseInt($("#content").css("padding-bottom") || 0, 10);
    }

    $("#content").css({ "min-height": height - paddingTop - paddingBottom });
  }
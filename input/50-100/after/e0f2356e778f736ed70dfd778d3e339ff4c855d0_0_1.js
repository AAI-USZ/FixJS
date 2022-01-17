function animateClose(callback) {
    var body = $("body"),
        bodyWidth = body.innerWidth(),
        doAnimation = $("#signIn").length && bodyWidth > 640;

    if (doAnimation) {
      /**
       * Force the arrow to slide all the way off the screen.
       */
      var endWidth = bodyWidth + $(".arrowContainer").outerWidth();

      body.addClass("completing");
      /**
       * CSS transitions are used to do the slide effect.  jQuery has a bug
       * where it does not do transitions correctly if the box-sizing is set to
       * border-box and the element has a padding
       */
      $("#signIn").css("width", endWidth + "px");

      // Call setTimeout here because on Android default browser, sometimes the
      // callback is not correctly called, it seems as if jQuery does not know
      // the animation is complete.
      setTimeout(complete.curry(callback), 1750);
    }
    else {
      complete(callback);
    }
  }
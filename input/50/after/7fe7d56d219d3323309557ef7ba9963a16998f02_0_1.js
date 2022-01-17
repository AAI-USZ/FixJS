function() {
  $.mobile.defaultPageTransition = "slide";
  if ($.mobile.maxScrollForTransition) {
    $.mobile.maxScrollForTransition = function() {
      return 0;
      };
  }
}
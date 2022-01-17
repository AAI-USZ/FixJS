function showHint(showSelector, callback) {
    // Only show the hint if it is not already shown. Showing the same hint
    // on every keypress massively slows down Fennec. See issue #2010
    // https://github.com/mozilla/browserid/issues/2010
    if (currentHint === showSelector) return;
    currentHint = showSelector;

    _.each(hints, function(className) {
      if(className != showSelector) {
        dom.hide("." + className + ":not(." + showSelector + ")");
      }
    });

    $("." + showSelector).fadeIn(ANIMATION_TIME, function() {
      // Fire a window resize event any time a new section is displayed that
      // may change the content's innerHeight.  this will cause the "screen
      // size hacks" to resize the screen appropriately so scroll bars are
      // displayed when needed.
      dom.fireEvent(window, "resize");
      complete(callback);
    });
  }
function(pair) {
    if ($(pair.key) && !celSlideShow_isInOverlay(pair.key)) {
      celSlideShowStopSlideShow(pair.key);
      celSlideShowPausedSlideShowIds.push(pair.key);
      celSlideShow_getOuterWrapperElement(pair.key).removeClassName(
          'celanim_slideshow_running');
      celSlideShow_getOuterWrapperElement(pair.key).addClassName(
          'celanim_slideshow_paused');
    }
  }
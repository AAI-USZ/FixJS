function(effect) {
  var slideConfig = celSlideShowConfig.get(effect.options.slideShowElemId);
  var fadeimgtemp = $(slideConfig.htmlId + '_tmpImg');
  var fadeimg = $(slideConfig.htmlId);
  if (fadeimg && fadeimgtemp) {
    fadeimg.src = fadeimgtemp.src;
    fadeimg.setStyle({
      'top' : fadeimgtemp.getStyle('top'),
      'left' : fadeimgtemp.getStyle('left')
    });
    fadeimg.show();
    fadeimgtemp.hide();
    $(slideConfig.htmlId).fire('celanim_slideshow:afterChangeImage', slideConfig);
    if (slideShowHasNextImage(slideConfig)) {
      removeImageSize(fadeimgtemp);
      var isNewImage = !fadeimgtemp.src.endsWith(slideConfig.nextimgsrc);
      fadeimgtemp.src = slideConfig.nextimgsrc;
      if (isNewImage && celSlideShowIsRunning(slideConfig.htmlId)) {
        scheduleChangeImage(slideConfig.htmlId);
      }
    }
    $(slideConfig.htmlId).removeClassName('celanim_isChanging');
  }
}
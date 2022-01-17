function(elemId) {
  var isManualStart = $(elemId).hasClassName('celanim_manualstart');
  var isCelanimOverlay = $(elemId).hasClassName('celanim_overlay');
  if (isCelanimOverlay) {
    $(elemId).stopObserving('celanim_overlay:afterExpand', celSlideShow_AfterExpand);
    $(elemId).observe('celanim_overlay:afterExpand', celSlideShow_AfterExpand);
  }
  celSlideShowIsRunningHash.set(elemId, !isManualStart);
  if (isManualStart) {
    var startButtonDiv = new Element('div', { 'class' : 'slideshowButton' });
    startButtonDiv.hide();
    $(elemId).insert({ after : startButtonDiv });
    if (isCelanimOverlay) {
      $(elemId).up('div.celanim_slideshow_wrapper').observe('click',
          celSlideShowStartOverlay);
    } else {
      $(elemId).up('div.celanim_slideshow_wrapper').observe('click',
          celSlideShowManualStartStop);
    }
    Effect.Appear(startButtonDiv, { duration : 3.0 , to : 0.8 });
  } else {
    celSlideShowStartSlideShow(elemId);
  }
  if ($(elemId).hasClassName('celanim_addNavigation')) {
    celSlideShow_addNavigation(elemId);
    celSlideShow_getOuterWrapperElement(elemId).fire(
        'celanim_slideshow:afterAddNavigation', celSlideShowConfig.get(elemId));
  }
}
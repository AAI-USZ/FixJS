function(event) {
  var overlayExpander = event.memo;
  var elemId = overlayExpander.thumb.id; 
  var overlayImg = $$('.celanim_overlay_wrapper img.highslide-image')[0];
  overlayImg.addClassName('celanim_slideshow');
  var overlayId = elemId.replace(/^([^:]*):(.*)$/, '$1_overlay:$2');
  overlayImg.id = overlayId;
  var newConfig = $H(celSlideShowConfig.get(elemId)).toObject(); // make a copy
  newConfig.htmlId = overlayId;
  newConfig.nextImg = undefined;
  celSlideShows_initOneSlideShow(newConfig);
  celSlideShow_startOne(overlayId);
  changeImage(overlayId);
  if ($(overlayId).up('.celanim_addNavigation')) {
    celSlideShow_addNavigation(overlayId);
    $(overlayId).fire('celanim_slideshow:afterAddNavigation', newConfig);
  }
}
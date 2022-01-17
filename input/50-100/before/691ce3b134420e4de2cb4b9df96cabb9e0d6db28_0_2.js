function(elemId) {
  if ((typeof console != 'undefined') && (typeof console.debug != 'undefined')) {
    console.debug('celSlideShow_isInOverlay: ' + elemId);
  }
  return ($(elemId) && (typeof $(elemId).up('.highslide-container') != "undefined"));
}
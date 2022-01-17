function(overlayHTMLDiv) {
    var overlayHTMLDiv2 = overlayHTMLDiv.down('div');
    var overlayWrapper = overlayHTMLDiv2.up('.highslide-wrapper');
    overlayWrapper.setStyle({ 'width' : overlayHTMLDiv2.getWidth() + 'px' });
    overlayHTMLDiv.setStyle({ 'width' : overlayHTMLDiv2.getWidth() + 'px' });
    //fix height of internal divs
    var imgInOverlay = overlayHTMLDiv.down('img.highslide-image');
    overlayHTMLDiv.select('div').each(function(divElem) {
      if (!divElem.hasClassName('highslide-header')) {
        divElem.setStyle({'height' : '100%'});
      }
    });
    if (imgInOverlay) {
      imgInOverlay.setStyle({
        'position' : 'absolute',
        'visibility' : 'hidden'
      });
    }
  }
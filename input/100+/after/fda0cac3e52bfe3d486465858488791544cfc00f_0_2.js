function(overlayHTMLDiv) {
    //FIX width of overlayWrapper after opening second time.
    //IMPORTANT: do not set height similarly, because sometimes it is only 16px on first opening.
    var overlayHTMLDiv2 = overlayHTMLDiv.down('div');
    var overlayWrapper = overlayHTMLDiv2.up('.highslide-wrapper');
    overlayWrapper.setStyle({ 'width' : overlayHTMLDiv2.getWidth() + 'px' });
    overlayHTMLDiv.setStyle({ 'width' : overlayHTMLDiv2.getWidth() + 'px' });
    if (overlayWrapper.hasClassName('celanim_hasCloseButton')) {
      var closeButtonElem = new Element('div', {
        'class' : 'closebutton',
        'title' : 'Close'
      });
      closeButtonElem.observe('click', function() {
        hs.close(this);
      });
      overlayHTMLDiv.insert({
        'after' : closeButtonElem
      });
    }
    //center image
    var imgInOverlay = overlayHTMLDiv.down('img.highslide-image');
    if (imgInOverlay) {
      imgInOverlay.observe('load', centerImage);
      // load will be only fired if the image is not yet loaded.
      //Thus we execute centerImage once for if it is already loaded.
      celSlideShowInternalCenterImage(imgInOverlay);
      imgInOverlay.setStyle({
        'visibility' : 'visible'
      });
    }
  }
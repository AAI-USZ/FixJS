function(slideShowConfig) {
  if (slideShowConfig.imageArray && (slideShowConfig.imageArray.size() > 0)) {
    celSlideShowConfig.set(slideShowConfig.htmlId, slideShowConfig);
    var tempImg = new Element('img', {
      'id' : slideShowConfig.htmlId + '_tmpImg',
      'style' : 'position: absolute; top: 0px; left: 0px;'
     }).hide();
    tempImg.observe('load', centerImage);
    var divWrapper = $(slideShowConfig.htmlId).wrap('div', {
        'class' : 'celanim_slideshow_wrapper' }
      ).insert({ top : tempImg });
    if ($(slideShowConfig.htmlId).up('.highslide-html')) {
      var overlayHTMLDiv = $(slideShowConfig.htmlId).up('.highslide-html');
      divWrapper.setStyle({ 'height' : overlayHTMLDiv.getHeight() + 'px' });
      divWrapper.setStyle({ 'width' : overlayHTMLDiv.getWidth() + 'px' });
      $(slideShowConfig.htmlId).setStyle({
        'margin-top' : '0',
        'margin-bottom' : '0',
        'margin-left' : '0',
        'margin-right' : '0'
      });
    } else {
      //TODO maybe move to onLoad on image
//      console.debug('copy dimensions: ', $(slideShowConfig.htmlId).getHeight(), $(slideShowConfig.htmlId).getWidth());
      divWrapper.setStyle({ 'height' : $(slideShowConfig.htmlId).getHeight() + 'px' });
      divWrapper.setStyle({ 'width' : $(slideShowConfig.htmlId).getWidth() + 'px' });
    }
    var slideShowImg = $(slideShowConfig.htmlId);
    $w(slideShowImg.className).without('celanim_slideshow').without('celanim_overlay'
        ).each(function(className) {
      divWrapper.addClassName(className);
    });
    moveStyleToWrapper(divWrapper, slideShowImg, 'float');
    moveStyleToWrapper(divWrapper, slideShowImg, 'margin-top');
    moveStyleToWrapper(divWrapper, slideShowImg, 'margin-bottom');
    moveStyleToWrapper(divWrapper, slideShowImg, 'margin-left');
    moveStyleToWrapper(divWrapper, slideShowImg, 'margin-right');
    moveStyleToWrapper(divWrapper, slideShowImg, 'border-top');
    moveStyleToWrapper(divWrapper, slideShowImg, 'border-bottom');
    moveStyleToWrapper(divWrapper, slideShowImg, 'border-right');
    moveStyleToWrapper(divWrapper, slideShowImg, 'border-left');
    slideShowConfig.doImageResize = !slideShowImg.hasClassName('celanim_withoutImageResize');
    slideShowConfig.imageSrcQuery = slideShowImg.src.replace(/.*(\?.*)$/, '$1');
    /** START HACK: increase height and width by one to fix problem in celements-photo
     *              which sometimes returns images too small by one in both dimensions.
     **/
    var celwidth = parseInt(slideShowConfig.imageSrcQuery.replace(/^.*celwidth=(\d+).*/,
        '$1')) + 1;
    var celheight = parseInt(slideShowConfig.imageSrcQuery.replace(
        /^.*celheight=(\d+).*/, '$1')) + 1;
    slideShowConfig.imageSrcQuery = slideShowConfig.imageSrcQuery.replace(
        /celheight=(\d+)/, 'celheight=' + celheight).replace(/celwidth=(\d+)/,
            'celwidth=' + celwidth);
    if (slideShowConfig.doImageResize) {
      slideShowImg.src = slideShowImg.src.replace(/(\?.*)$/,
          slideShowConfig.imageSrcQuery);
    } else {
      slideShowImg.src = slideShowImg.src.replace(/(\?.*)$/, '');
    }
    /**  END HACK
     **/
    slideShowConfig.hasRandomStart = $(slideShowConfig.htmlId).hasClassName(
        'celanim_slideshowRandomStart');
    slideShowImg.absolutize();
    removeImageSize(slideShowImg);
    // fix centering of first image
//    console.debug('recenter image: ',slideShowImg.getHeight(),slideShowImg.getWidth());
    slideShowImg.observe('load', centerImage);
    slideShowImg.src = slideShowImg.src;
    if (slideShowHasNextImage(slideShowConfig)) {
      if (slideshowIsDebug && (typeof console != 'undefined')
          && (typeof console.debug != 'undefined')) {
        console.debug('celSlideShows_initOneSlideShow: set next image to ',
            slideShowConfig.nextImg, ", ", slideShowConfig.nextimgsrc);
      }
      tempImg.src = slideShowConfig.nextimgsrc;
    }
    $(slideShowConfig.htmlId).fire('celanim_slideshow:afterInit', slideShowConfig);
  }
}
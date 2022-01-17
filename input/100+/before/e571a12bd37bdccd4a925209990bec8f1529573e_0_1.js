function() {
    /* To prevent multi open */
    if (this.isOpen)
      return ;
    /* Fire the beforeOpen event */
    if (!this.beforeOpen()) return;
    this.isOpen = true;
    /* Construct the exposeMask and the content */
    this.imageList = [];
    this.currentImageIndex = 0;
    var maskId = "tiSlideshowExposeMask";
    while ($('#'+maskId).length) {
      maskId += "i";
    }
    this.maskId = maskId;
    var exposeMask = "<div id=\"" + this.maskId + "\" class=\"tiSlideshowExposeMask\" style=\"opacity: " + this.options.opacity + "; background-color: " + this.options.mask + "; \"></div>";
    var placeControl = '<div class="tiSlideshowPlaceControl"><div class="tiSlideshowPlaceControlThumbnailsScroll"><div class="tiSlideshowPlaceControlThumbnails"></div></div><a href="#" class="tiSlideshowPlaceControlClose"></a></div>';
    var place = '<div class="tiSlideshowPlace"><div class="tiSlideshowPlaceSlider"><a href="#" class="tiSlideshowPlaceSliderPrevious"></a><a href="#" class="tiSlideshowPlaceSliderNext"></a><div class="tiSlideshowPlaceSliderPicture"></div></div>'+placeControl+'</div>';
    $('body').append(exposeMask);
    $('body').append(place);
    if (navigator.appName == 'Microsoft Internet Explorer') {
      $('.tiSlideshowPlaceControl').css('border', '1px solid white');
    }
    var self = this;
    /* Initialize slider content, and thumbnails */
    $(self.container).children('img').each(function() {
      var src = $(this).attr('src');
      self.imageList.push(src);
      var thumbnail = '<a href="#" class="tiSlideshowPlaceControlThumbnailsThumbnail"><img src="'+self.getThumbnailSrc(src)+'" alt="thumbnail" /></a>';
      $('.tiSlideshowPlaceControlThumbnails').append(thumbnail);
    })
    self.initThumbnailsEvent();
    /* If there is a picture for the given index, we show it */
    self.currentImageIndex = self.options.beginIndex;
    if (self.currentImageIndex >= 0 && parseInt(self.currentImageIndex) < parseInt(self.imageList.length)) {
      this.showCurrentImage();
    } else if (self.imageList.length > 0) {
      self.currentImageIndex = 0;
      self.showCurrentImage();
    }
    /* Apply options */
    this.changeOptions();
    /* Flush the display */
    $('.tiSlideshowExposeMask').show();
    $('.tiSlideshowPlace').show();
    /* Fire the onOpen event */
    this.onOpen();
  }
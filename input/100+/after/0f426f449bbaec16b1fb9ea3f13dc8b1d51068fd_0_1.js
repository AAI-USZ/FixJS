function(options) {
    this.options = $.extend({}, this.options, options);
    /* mask */
    $('#'+this.maskId).css('background-color', this.options.mask);
    /* opacity */
    $('#'+this.maskId).css('opacity', this.options.opacity);
    /* closeButton */
    if (this.options.closeButton)
      $('.tiSlideshowPlaceControlClose').width(100);
    else
      $('.tiSlideshowPlaceControlClose').width(0);
    /* slideButtons */
    if (this.options.slideButtons) {
      $('.tiSlideshowPlaceSliderPrevious, .tiSlideshowPlaceSliderNext').show();
    }
    else
      $('.tiSlideshowPlaceSliderPrevious, .tiSlideshowPlaceSliderNext').hide();
    /* infiniteSlide */
    if (this.options.slideButtons) {
      if (this.options.infiniteSlide) {
        if (this.currentImageIndex == 0) $('.tiSlideshowPlaceSliderPrevious').show();
        if (this.currentImageIndex == this.imageList.length - 1) $('.tiSlideshowPlaceSliderNext').show();
      } else {
        if (this.currentImageIndex == 0)
          $('.tiSlideshowPlaceSliderPrevious').hide();
        else
          $('.tiSlideshowPlaceSliderPrevious').show();
        if (this.currentImageIndex == this.imageList.length - 1)
          $('.tiSlideshowPlaceSliderNext').hide();
        else
          $('.tiSlideshowPlaceSliderNext').show();
      }
    }
    /* thumbnails */
    if (this.options.thumbnails) {
      $('.tiSlideshowPlaceControlThumbnailsScroll').show();
    } else {
      $('.tiSlideshowPlaceControlThumbnailsScroll').hide();
    }
    
    /* Render the elements */
    $.tiSlideshow.adjustSize();
  }
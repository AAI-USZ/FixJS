function(options) {
    var self = this;
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
      if (this.imageList.length == 0) {
        $('.tiSlideshowPlaceSliderPrevious, .tiSlideshowPlaceSliderNext').hide();
      } else if (this.options.infiniteSlide) {
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
    /* tactile */
    if (this.options.tactile) {
      $('.tiSlideshowPlaceControlThumbnailsThumbnail').each(function() { $(this).replaceWith('<span class="tiSlideshowPlaceControlThumbnailsThumbnail">'+$(this).html()+'</span>'); });
      $('.tiSlideshowPlaceControlClose').replaceWith('<span class="tiSlideshowPlaceControlClose"></span>');
      $('.tiSlideshowPlaceSlider .tiSlideshowPlaceSliderPrevious').replaceWith('<span class="tiSlideshowPlaceSliderPrevious"></span>');
      $('.tiSlideshowPlaceSlider .tiSlideshowPlaceSliderNext').replaceWith('<span class="tiSlideshowPlaceSliderNext"></span>');
      $('body').bind("touchmove", $.tiSlideshow.preventTouchmove);
    } else {
      $('.tiSlideshowPlaceControlThumbnailsThumbnail').each(function() { $(this).replaceWith('<a href="#" class="tiSlideshowPlaceControlThumbnailsThumbnail">'+$(this).html()+'</a>'); });
      $('.tiSlideshowPlaceControlClose').replaceWith('<a href="#" class="tiSlideshowPlaceControlClose"></a>');
      $('.tiSlideshowPlaceSlider .tiSlideshowPlaceSliderPrevious').replaceWith('<a href="#" class="tiSlideshowPlaceSliderPrevious"></a>');
      $('.tiSlideshowPlaceSlider .tiSlideshowPlaceSliderNext').replaceWith('<a href="#" class="tiSlideshowPlaceSliderNext"></a>');
      $('body').unbind("touchmove", $.tiSlideshow.preventTouchmove);
    }
    $('.tiSlideshowPlaceSliderPrevious').click(function() { self.previous(); return false; });
    $('.tiSlideshowPlaceSliderNext').click(function() { self.next(); return false; });
    $('.tiSlideshowPlaceControlClose').click(function() { self.close(); return false; });
    self.initThumbnailsEvent();
    
    /* Render the elements */
    $.tiSlideshow.adjustSize();
  }
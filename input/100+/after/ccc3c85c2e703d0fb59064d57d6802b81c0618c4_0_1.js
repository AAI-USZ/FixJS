function(callback) {
    var self = this;
    $('.tiSlideshowPlaceSliderPicture').html('<img src="'+self.imageList[self.currentImageIndex]+'" alt="picture" style="display: hidden;"/>');
    if (!$('.tiSlideshowPlaceSliderPicture img').height() || !$('.tiSlideshowPlaceSliderPicture img').width()) {
      $('.tiSlideshowPlaceSliderPicture img').load(function() {
        $('.tiSlideshowPlaceSliderPicture img').data('originalHeight', this.height);
        $('.tiSlideshowPlaceSliderPicture img').data('originalWidth', this.width);
        $.tiSlideshow.adjustSize();
        $('.tiSlideshowPlaceSliderPicture img').show();
        $('.tiSlideshowPlaceControlThumbnailsSelected').removeClass('tiSlideshowPlaceControlThumbnailsSelected');
        $('.tiSlideshowPlaceControlThumbnails .tiSlideshowPlaceControlThumbnailsThumbnail:eq('+self.currentImageIndex+')').addClass('tiSlideshowPlaceControlThumbnailsSelected');
        if (callback)
          callback();
      });
    } else {
      $('.tiSlideshowPlaceSliderPicture img').data('originalHeight', $('.tiSlideshowPlaceSliderPicture img').height());
      $('.tiSlideshowPlaceSliderPicture img').data('originalWidth', $('.tiSlideshowPlaceSliderPicture img').width());
      $.tiSlideshow.adjustSize();
      $('.tiSlideshowPlaceSliderPicture img').show();
      $('.tiSlideshowPlaceControlThumbnailsSelected').removeClass('tiSlideshowPlaceControlThumbnailsSelected');
      $('.tiSlideshowPlaceControlThumbnails .tiSlideshowPlaceControlThumbnailsThumbnail:eq('+self.currentImageIndex+')').addClass('tiSlideshowPlaceControlThumbnailsSelected');
      if (callback)
        callback();      
    }
  }
function(callback) {
    var self = this;
    $('.tiSlideshowPlaceSliderPicture').html('<img src="'+self.imageList[self.currentImageIndex]+'" alt="picture" style="display: none;"/>');
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
  }
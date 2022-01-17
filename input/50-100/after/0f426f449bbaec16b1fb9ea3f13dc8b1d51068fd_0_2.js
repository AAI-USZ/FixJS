function() {
      $('.tiSlideshowPlaceSliderPicture img').data('originalHeight', this.height);
      $('.tiSlideshowPlaceSliderPicture img').data('originalWidth', this.width);
      $.tiSlideshow.adjustSize();
      $('.tiSlideshowPlaceSliderPicture img').show();
      $('.tiSlideshowPlaceControlThumbnailsSelected').removeClass('tiSlideshowPlaceControlThumbnailsSelected');
      $('.tiSlideshowPlaceControlThumbnails .tiSlideshowPlaceControlThumbnailsThumbnail:eq('+self.currentImageIndex+')').addClass('tiSlideshowPlaceControlThumbnailsSelected');
      if (callback)
        callback();
    }
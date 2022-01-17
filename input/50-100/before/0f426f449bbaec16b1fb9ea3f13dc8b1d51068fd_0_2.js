function() {
      $('.tiSlideshowPlaceSliderPicture img').data('originalHeight', $('.tiSlideshowPlaceSliderPicture img').height());
      $('.tiSlideshowPlaceSliderPicture img').data('originalWidth', $('.tiSlideshowPlaceSliderPicture img').width());
      $.tiSlideshow.adjustSize();
      $('.tiSlideshowPlaceSliderPicture img').show();
      $('.tiSlideshowPlaceControlThumbnailsSelected').removeClass('tiSlideshowPlaceControlThumbnailsSelected');
      $('.tiSlideshowPlaceControlThumbnails .tiSlideshowPlaceControlThumbnailsThumbnail:eq('+self.currentImageIndex+')').addClass('tiSlideshowPlaceControlThumbnailsSelected');
      if (callback)
        callback();
    }
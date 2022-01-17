function() {
      /* Check if a tiSlideshow is open */
      var openedTiSlideshow = $.tiSlideshow.retrieveOpenedTiSlideshow();
      if (!openedTiSlideshow)
        return ;
      var window_height = $(window).height();
      var window_width = $(window).width();
      /* Resize inside tiSlideshowPlace, choose size of the main top and bottom parts */
      if (window_height - 100 > 0)
        $('.tiSlideshowPlaceSlider').height(window_height - 100);
      else
        $('.tiSlideshowPlaceSlider').height(0);
      /* Properly place arrows to change slide */
      var diff_previous = parseInt(($('.tiSlideshowPlaceSlider').height() - $('.tiSlideshowPlaceSliderPrevious').height()) / 2);
      var diff_next = parseInt(($('.tiSlideshowPlaceSlider').height() - $('.tiSlideshowPlaceSliderNext').height()) / 2);
      $('.tiSlideshowPlaceSliderPrevious').css('top', diff_previous + 'px');
      $('.tiSlideshowPlaceSliderNext').css('top', diff_next + 'px');
      
      /* Resize inside tiSlideshowPlaceControl */
      if ($('.tiSlideshowPlaceControlThumbnailsScroll').data('jsp'))
        $('.tiSlideshowPlaceControlThumbnailsScroll').data('jsp').destroy();
      if (window_width - 100 > 0) {
        $('.tiSlideshowPlaceControlThumbnailsScroll').width(window_width - 100);
      }
      else
        $('.tiSlideshowPlaceControlThumbnailsScroll').width(0);
      /* Resize each thumbnail */
      $('.tiSlideshowPlaceControlThumbnailsThumbnail').each(function() {
        var max_t_h = $(this).height();
        var max_t_w = $(this).width();
        if ($(this).find('img').data('originalHeight') && $(this).find('img').data('originalWidth')) {
          var h = $(this).find('img').data('originalHeight');
          var w = $(this).find('img').data('originalWidth');
          if (h > max_t_h || w > max_t_w) {
            if (h > max_t_h) {
              w = w * max_t_h / h;
              h = max_t_h;
            }
            if (w > max_t_w) {
              h = h * max_t_w / w;
              w = max_t_w;
            }
            $(this).find('img').height(h);
            $(this).find('img').width(w);
            var diff = parseInt((max_t_h - h) / 2);
            if (diff < 0)
              diff = 0;
            $(this).find('img').css('margin-top', diff+'px');
          }
        }
      });
      /* Activate the ScrollPane */
      if (!$('.tiSlideshowPlaceControlThumbnailsScroll').data('jsp')) {
        if ($.fn.jScrollPane)
          $('.tiSlideshowPlaceControlThumbnailsScroll').jScrollPane();
      } else {
        $('.tiSlideshowPlaceControlThumbnailsScroll').data('jsp').reinitialise();
      }
      /* Resize inside tiSlideshowPlaceSlider */
      var max_h = parseInt($('.tiSlideshowPlaceSlider').height());
      var max_w = parseInt($('.tiSlideshowPlaceSlider').width());
      var $elem = $('.tiSlideshowPlaceSliderPicture img');
      if (!$elem.data('originalHeight') || !$elem.data('originalWidth')) {
        return ;
      }
      var h = parseInt($elem.data('originalHeight'));
      var w = parseInt($elem.data('originalWidth'));
      /* Check if you have to resize image */
      $('.tiSlideshowPlaceSliderPicture img').css('margin-top', '0px');
      if (h > max_h || w > max_w) {
        if (h > max_h) {
          w = w * max_h / h;
          h = max_h;
        }
        if (w > max_w) {
          h = h * max_w / w;
          w = max_w;
        }
      }
      $('.tiSlideshowPlaceSliderPicture img').height(h);
      $('.tiSlideshowPlaceSliderPicture img').width(w);
      var diff = parseInt((max_h - h) / 2);
      if (diff < 0)
        diff = 0;
      $('.tiSlideshowPlaceSliderPicture img').css('margin-top', diff+'px');
    }
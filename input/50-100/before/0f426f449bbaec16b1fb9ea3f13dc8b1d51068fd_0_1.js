function() {
      $(this).data('originalHeight', $(this).height());
      $(this).data('originalWidth', $(this).width());
      $.tiSlideshow.adjustSize();
    }
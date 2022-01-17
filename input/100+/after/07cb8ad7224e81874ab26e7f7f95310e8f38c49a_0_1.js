function($slider, showNextSlide, movingSlides){
      var $sliderContainer = $($slider.children('.responSlider-sliderContainer').get(0)),
        $slides = $sliderContainer.children(),
        horizontalOffset  =   $slides.outerWidth(true),
        $selectedSlides   =   showNextSlide ? $slides.slice(0,movingSlides) : $slides.slice(-1 * movingSlides),
        startPosContainer   =   showNextSlide ? (horizontalOffset * movingSlides) : 0,
        endPosContainer   =   (!showNextSlide) ? (horizontalOffset * movingSlides) : 0,
        maxZIndex     = parseInt($slides.css("z-index"),10);

      if (showNextSlide){
        $sliderContainer.append($selectedSlides);
      }

      $sliderContainer.css("left", startPosContainer + "px");

      $selectedSlides.each(
        function(i){
          $(this).css({
            position: "absolute",
            left: (horizontalOffset * (i - movingSlides)) + "px",
            "z-index": maxZIndex + 1
          });
        }
      );

      $sliderContainer.animate({
        left: endPosContainer + "px"},
        _options.transitionTime,
        function(){
        if (!showNextSlide){
          $sliderContainer.prepend($selectedSlides);
        }
        $sliderContainer.css("left", "");
        $selectedSlides.css({
          position: "",
          left: "",
          "z-index": ""
        });
      });
    }
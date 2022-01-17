function($slider, showNextSlide, movingSlides){
      var $sliderContainer = $($slider.children().get(0)),
        $slides       = $sliderContainer.children(),
        $selectedSlides   =   showNextSlide ? $slides.slice(0,movingSlides) : $slides.slice(-1 * movingSlides),
        originalOpacity   = $sliderContainer.css("opacity");

      originalOpacity = !!(originalOpacity) ? originalOpacity : 1;

      $sliderContainer.animate({
        opacity: 0
      }, _options.transitionTime / 2,
      function(){
        showNextSlide ? $sliderContainer.append($selectedSlides) : $sliderContainer.prepend($selectedSlides);

        $sliderContainer.animate({
          opacity: originalOpacity
        }, _options.transitionTime / 2, function(){
          $sliderContainer.attr("style","");
        });
      });
    }
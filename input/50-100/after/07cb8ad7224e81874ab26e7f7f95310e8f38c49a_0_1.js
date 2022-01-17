function($slider, showNextSlide, movingSlides){
      var $sliderContainer = $($slider.children('.responSlider-sliderContainer').get(0)),
        $slides       = $sliderContainer.children(),
        $selectedSlides   =   showNextSlide ? $slides.slice(0,movingSlides) : $slides.slice(-1 * movingSlides);

      showNextSlide ? $sliderContainer.append($selectedSlides) : $sliderContainer.prepend($selectedSlides);
    }
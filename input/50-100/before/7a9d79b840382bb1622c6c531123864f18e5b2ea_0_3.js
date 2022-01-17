function(e, showNextSlide ){
        var $slider = $this;
        if ($slider.filter(":animated").length === 0){
            var visibleSlides = Math.ceil($slider.outerWidth() / $slider.find('.responSlider-slide').outerWidth());

            _effects[_options.effect]($slider, showNextSlide, Math.min(_options.movingSlides, visibleSlides));
          }
        }
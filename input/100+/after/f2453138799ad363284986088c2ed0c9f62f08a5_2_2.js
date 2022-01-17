function() {
        var $sliderContainer = $(".slider-container"),
            $sliderHandle = $('.slider-handle'),
            $sliderFill = $('.slider-fill'),
            $sliderValue = $(".video-seek"),
            width = $sliderContainer.outerWidth() - $sliderHandle.outerWidth(),
            val = 20;

        $slider.slider('setValue', val);

        deepEqual(parseInt($sliderValue.val(), 10), val, "Slider value is " + val);
    }
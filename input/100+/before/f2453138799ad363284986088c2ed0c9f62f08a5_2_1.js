function() {
        var $sliderHandle = $('.slider-handle'),
            $sliderFill = $('.slider-fill'),
            val = 20;

        $slider.slider('setPosition', val);

        sliderFillWidth = parseInt($sliderFill.css('width'), 10);
        expectedFillWidth = val;
        sliderHandleLeft = parseInt($sliderHandle.css('left'), 10);
        expectedHandleLeft = val;

        deepEqual(sliderHandleLeft, expectedHandleLeft,
            "Slider handle in correct position when setPosition passed " + val
        );
        deepEqual(sliderFillWidth, expectedFillWidth,
            "Slider fill is correct width when setPosition passed " + val
        );
    }
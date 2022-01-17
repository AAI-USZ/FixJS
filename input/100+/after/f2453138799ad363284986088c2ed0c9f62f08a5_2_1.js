function() {
        var $sliderContainer = $(".slider-container"),
            $sliderHandle = $('.slider-handle'),
            $sliderFill = $('.slider-fill'),
            $sliderValue = $(".video-seek"),
            sliderFillWidth, expectedFillWidth,
            sliderHandleLeft, expectedHandleLeft,
            expectedValue,
            width = $sliderContainer.outerWidth() - $sliderHandle.outerWidth(),
            position = 531;

        $slider.slider('setPosition', position, false);

        sliderFillWidth = parseInt($sliderFill.css('width'), 10);
        expectedFillWidth = position;
        sliderHandleLeft = parseInt($sliderHandle.css('left'), 10);
        expectedHandleLeft = position;

        expectedValue = 0;

        deepEqual(sliderHandleLeft, expectedHandleLeft,
            "Slider handle in correct position when setPosition passed " + position
        );
        deepEqual(sliderFillWidth, expectedFillWidth,
            "Slider fill is correct width when setPosition passed " + position
        );
        deepEqual($sliderValue.val(), expectedValue.toString(),
            "Slider value is " +
            expectedValue.toString() +
            " (correct) when when clicked at " + position
        );
    }
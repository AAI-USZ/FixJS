function() {
        var sliderHandleLeft, expectedHandleLeft,
            sliderFillWidth, expectedFillWidth,
            expectedValue,
            evDragStart = $.Event('dragstart'),
            evDrag = $.Event('drag'),
            evDragStop = $.Event('dragstop'),
            $sliderContainer = $(".slider-container"),
            $sliderHandle = $(".slider-handle"),
            $sliderFill = $(".slider-fill"),
            $sliderValue = $(".video-seek"),
            width = $sliderContainer.outerWidth() - $sliderHandle.outerWidth(),
            limit = $slider.slider('getLimitObject', $sliderContainer, $sliderHandle),
            testPositionPercentage = [0, 33, 50, 25, 75, 100, 99, 98, 97];

        $.each(testPositionPercentage, function(i, perc) {
            var dd = {},
                position = parseInt((limit.right / 100) * perc, 10);

            dd.offsetX = evDrag.offsetX = position;
            dd.offsetY = evDrag.offsetY = 5;

            dd.offsetX += $sliderContainer.offset().left;

            $sliderHandle.trigger(evDragStart, dd);
            $sliderHandle.trigger(evDrag, dd);
            $sliderHandle.trigger(evDragStop, dd);

            sliderFillWidth = parseInt($sliderFill.css('width'), 10);
            expectedFillWidth = position;
            sliderHandleLeft = parseInt($sliderHandle.css('left'), 10);
            expectedHandleLeft = position;

            expectedValue = parseInt((position / width) * 100, 10);

            deepEqual(sliderHandleLeft, expectedHandleLeft,
                "Slider handle in correct position when dragged to " + perc + "%"
            );
            deepEqual(sliderFillWidth, expectedFillWidth,
                "Slider fill is correct width when dragged to " + perc + "%"
            );
            deepEqual($sliderValue.val(), expectedValue.toString(),
                "Slider value is " +
                expectedValue.toString() +
                " (correct) when dragged to " + perc + "%"
            );
        });
    }
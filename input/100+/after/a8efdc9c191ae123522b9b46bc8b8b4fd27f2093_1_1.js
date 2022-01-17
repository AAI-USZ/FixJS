function(i, perc) {
            var dd = {},
                position = ~~((limit.right / 100) * perc);

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

            deepEqual(sliderHandleLeft, expectedHandleLeft,
                "Slider handle in correct position when dragged to " + perc + "%"
            );
            deepEqual(sliderFillWidth, expectedFillWidth,
                "Slider fill is correct width when dragged to " + perc + "%"
            );
        }
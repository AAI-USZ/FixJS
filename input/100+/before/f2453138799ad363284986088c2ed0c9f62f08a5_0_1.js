function(){
                    var $slider = $(this).closest('.slider'),
                        $sliderContainer = $('.slider-container', $slider),
                        $sliderHandle = $('.slider-handle', $sliderContainer),
                        // Use of Math.min/max here to clip a variable
                        // See the "Clipping a variable" example here:
                        // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/min
                        y = Math.min(Math.max(x, 0), defaults.max),
                        position = parseInt(
                            (y / defaults.max) * ($sliderContainer.outerWidth() - $sliderHandle.outerWidth()),
                            10
                        );

                    $slider.slider('setPosition', position, parseInt(x, 10) !== y);
                }
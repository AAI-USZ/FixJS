function(){
                    var $slider = $(this).closest('.slider'),
                        $sliderValue = $('input', $slider),
                        $sliderContainer = $('.slider-container', $slider),
                        $sliderHandle = $('.slider-handle', $sliderContainer),
                        setVal,
                        // Use of Math.min/max here to clip a variable
                        // See the "Clipping a variable" example here:
                        // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/min
                        y = Math.min(Math.max(x, 0), defaults.max),
                        position = parseInt(
                            (y / defaults.max) * ($sliderContainer.outerWidth() - $sliderHandle.outerWidth()),
                            10
                        );
                        setVal = (parseInt(x, 10) !== y);

                    $sliderValue.val(x);
                    $slider.slider('setPosition', position, setVal);
                }
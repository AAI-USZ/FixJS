function () {

                container.find('.active').toggleClass('previous active');

                newSlide.toggleClass('active next');



                if ($('.logoLoader').size() > 0) {

                    // wait until animation has run before removing

                    setTimeout(function () {

                        $('.logoLoader').remove();

                    }, 5000);

                }

            }
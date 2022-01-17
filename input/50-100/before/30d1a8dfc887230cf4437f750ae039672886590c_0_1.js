function () {

                container.find('.active').toggleClass('previous active');

                newSlide.toggleClass('active next');



                if ($('.loader').size() > 0) {

                    // wait until animation has run before removing

                    setTimeout(function () {

                        $('.loader').remove();

                    }, 5000);

                }

            }
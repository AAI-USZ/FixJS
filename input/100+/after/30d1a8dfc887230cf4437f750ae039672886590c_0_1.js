function (image) {

            $('.status').text('Loading image...');

            container.find('.previous').remove();

            var newImage = $('<img />').attr('src', image.url),

                newSlide = $('<div />').addClass('slide next').append(newImage);

            container.append(newSlide);

            // wait until image loads

            newImage.on('load', function () {

                container.find('.active').toggleClass('previous active');

                newSlide.toggleClass('active next');



                if ($('.logoLoader').size() > 0) {

                    // wait until animation has run before removing

                    setTimeout(function () {

                        $('.logoLoader').remove();

                    }, 5000);

                }

            });

        }
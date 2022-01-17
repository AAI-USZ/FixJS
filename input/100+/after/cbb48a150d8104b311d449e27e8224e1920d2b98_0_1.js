function (img) {
            var that = this;
            // change which image is shown in the lightbox
            $('.ltl-box .image')
                .html($(img).clone());
            // when the image loads, align the lightbox
            $('.ltl-box .image img').load(function () {
                $('.ltl-box')
                    .css(
                        'marginTop',
                        -$('.ltl-box img').height() / 2
                    )
                    .css(
                        'marginLeft',
                        -$('.ltl-box img').width() / 2
                    );
            });
            // remember the current image
            this.current = img;
            // display the correct scroll arrows
            if ($(img).parent().prev().length) {
                $('.ltl-scroller.left').css('display', 'block');
            } else {
                $('.ltl-scroller.left').css('display', 'none');
            }
            if ($(img).parent().next().length) {
                $('.ltl-scroller.right').css('display', 'block');
            } else {
                $('.ltl-scroller.right').css('display', 'none');
            }
        }
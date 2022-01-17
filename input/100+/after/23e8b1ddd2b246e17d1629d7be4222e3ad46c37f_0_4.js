function () {
        var $span = $('> span.hover', this).css('opacity', 0);
        $(this).hover(function () {
            $span.stop().animate({
                'opacity': 1
            }, 650, 'easeOutQuint')
        }, function () {
            $span.stop().animate({
                'opacity': 0
            }, 750, 'easeOutSine')
        });
        $span.click(function () {
            $('#map_canvas').css({
                'z-index': '9900',
                'display': 'block',
                'opacity': '0'
            });
            $('#map_canvas').animate({
                opacity: 1.0
            }, 1200, 'easeInQuint');
            $('.table-fade').css({
                'display': 'block',
                'z-index': '9890'
            });
            $('.table-fade').animate({
                opacity: 0.8
            }, 1200, 'easeInQuint');
        });
    }
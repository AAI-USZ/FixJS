function loadPage() {
    // Staggered fade effect
    var showItem = function () {
            var self = this;
            $(self).stop().animate({
                'opacity': 1
            }, 1500, 'easeOutExpo')
        };
    var timeout = 0;
    $('.init').each(function (n) {
        var self = this;
        $(self).css({
            'opacity': 0
        });
        setTimeout(function () {
            showItem.apply(self)
        }, timeout += 150)
    });

    $("#slider").responsiveSlides({
        auto: true,
        speed: 600,
        timeout: 5000,
        pause: true
    });

    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano1_stitched_out.swf", "pano1", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano2_stitched_out.swf", "pano2", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano3_stitched_out.swf", "pano3", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano4_stitched_out.swf", "pano4", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano5_stitched_out.swf", "pano5", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano6_stitched_out.swf", "pano6", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano7_stitched_out.swf", "pano7", "680", "304", "9.0.0");
    swfobject.embedSWF("http://threepalmssalon.com/lib/i/panoramas/pano8_stitched_out.swf", "pano8", "680", "304", "9.0.0");

    $("#vrtoggle").click(function () {
        if ($("#vrtoggle").text() == "Virtual Tour") {
            $("#slider").fadeOut(750, "easeInOutSine", null);
            $("#virtual-tours").fadeIn(750, "easeInOutSine", null);
            $(this).text("Photos");
            $("#cp").animate({
                'top': '2660px'
            }, 450, 'easeInQuint');

        } else {
            $("#cp").animate({
                'top': '500px'
            }, 300, 'easeInQuint');
            $("#slider").fadeIn(750, "easeInOutSine");
            $("#virtual-tours").fadeOut(750, "easeInOutSine");
            $(this).text("Virtual Tour");
        }
    });

    $('#services a').append('<span class="hover" />').each(function () {
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
            $('.table-slide, .jq-class').animate({
                height: "100%"
            }, 500, 'easeInQuint');
            $('.table-fade').animate({
                opacity: 0.6
            }, 1200, 'easeInQuint');
            $('.table-fade-opaque').animate({
                opacity: 1.0
            }, 1200, 'easeInQuint');
            $('#table-curtains, #table-curtain-bottom').css({
                'display': 'block',
                'opacity': '0'
            });
            $('#table-curtains, #table-curtain-bottom').animate({
                opacity: 1.0
            }, 1290, 'easeOutSine');
            $('.table-fade').css({
                'display': 'block',
                'z-index': '9900'
            });
            $("#cp").animate({
                'top': '500px'
            }, 300, 'easeInQuint');
            $("#slider").fadeIn(750, "easeInOutSine");
            $("#virtual-tours").fadeOut(750, "easeInOutSine");
            $("#vrtoggle").text("Virtual Tour");

        });
        $('#table-bg').hover(function () {
            $(this).stop().animate({
                'opacity': 0.3
            }, 350, 'easeOutQuint')
        }, function () {
            $(this).stop().animate({
                'opacity': 0.5
            }, 450, 'easeOutSine')
        });

    });

    $('.map').append('<span class="hover" />').each(function () {
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
    });
    $('.table-fade').click(function () {
        dismiss();
    });
    $('.header-fade a').append('<span class="hover" />').each(function () {
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
    });
}
function () {
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

        }
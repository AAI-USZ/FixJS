function () {
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
    }
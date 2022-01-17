function () {
        if ($(window).height() <= 600 || $(window).width() <= 990) {
            $('#header').css('position', 'relative');
            $('#contentPane .sombra').css('position', 'static');
            $('#contentPane .marco-arriba').css('position', 'static');
            $('#dock').css('top', '0');
            $('#header-alt').css('height', '0');
            if ($(window).scrollTop() <= 103) {
                $('#dock').css('position', 'absolute');
            } else {
                $('#dock').css('position', 'fixed');
            }
        } else if ($(window).height() <= 600 && $(window).width() > 990) {
            $('#dock').css('position', 'fixed');
            $('#dock').css('top', 'auto');
        } else {
            $('#header').css('position', 'fixed');
            $('#contentPane .sombra').css('position', 'fixed');
            $('#contentPane .marco-arriba').css('position', 'fixed');
            $('#dock').css('top', 'auto');
            $('#header-alt').css('height', '102px');
            $('#dock').css('position', 'fixed');
        }
        if ($(window).width() <= 990) {
            if ($(window).scrollTop() <= 103) {
                $('#dock').css('left', '-' + $(window).scrollLeft() / 100 + 'px');
            } else {
                $('#dock').css('left', '-' + $(window).scrollLeft() + 'px');
            }
        }
    }
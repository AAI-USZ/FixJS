function () {
        if ($(window).height() <= 600) {
            if ($(window).scrollTop() <= 103) {
                $('#dock').css('position', 'absolute');
            } else {
                $('#dock').css('position', 'fixed');
            }
        } else {
            $('#dock').css('position', 'fixed');
        }
    }
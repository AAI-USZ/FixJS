function() {
        // Animation complete.
        $('#handPhone').animate({
            opacity : 1,
            bottom : '-950',
            left : '590px',
            width: '492px'

        }, 3000, function() {
            // Animation complete.
            $('.phoneSlideshowSmall').fadeIn();
            phonesmall = 1;
		
        });
    }
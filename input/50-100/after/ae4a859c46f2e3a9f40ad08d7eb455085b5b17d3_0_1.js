function() {
        // Animation complete.
        $('#handPhone').animate({
            opacity : 1,
            bottom : '-1000',
            left : '690px',
            width: '350px'

        }, 3000, function() {
            // Animation complete.
            $('.phoneSlideshowSmall').fadeIn();
            phonesmall = 1;
		
        });
    }
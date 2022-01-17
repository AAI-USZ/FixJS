function() {
        $(this).siblings('.message').animate({
            'height': '100px',
            'maxHeight': '100px'
        }, 400);
        $(this).text('[ More ]');
    }
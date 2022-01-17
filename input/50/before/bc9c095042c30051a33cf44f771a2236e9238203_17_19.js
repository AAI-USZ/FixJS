function(ev) {
            $('html:not(:animated),body:not(:animated)').animate({
                scrollTop: $('html').offset().top
            }, 500 );
        }
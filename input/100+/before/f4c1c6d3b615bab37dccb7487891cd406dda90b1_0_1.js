function() {

    // overflow hidden if iframe loaded
    if(window.location != window.parent.location)
        $('html,body').css({'overflow':'hidden'})

    $('#carousel').carousel({
        slideSpeed: 700,
    });
    $('#carousel .reportagem').jScrollPane({autoReinitialise: true});

    $('.programas-toggle').click(function() {
        if($('#programas-more').hasClass('active')) {
            $('#programas-more').removeClass('active');
            $('#carousel .programas .graph').css({'visibility':'visible'});
            $(this).text('Saiba mais sobre os programas');
        } else {
            $('#programas-more').addClass('active').jScrollPane();
            $('#carousel .programas .graph').css({'visibility':'hidden'});
            $(this).text('Ocultar informações sobre os programas');
        }
        return false;
    });
}
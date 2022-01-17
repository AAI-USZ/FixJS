function(ev){
        $('.contact_container').toggle('slow');
        $(this).html(($('.toggle').html() == 'Close <b>-</b>') ? 'Contact Me <b>+</b>' : 'Close <b>-</b>');
    }
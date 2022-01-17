function(){
    $('.contact_container').hide('slow');
    $('.toggle').show('slow');

    $('.toggle').click(function(){
        $('.contact_container').slideToggle();
    });
}
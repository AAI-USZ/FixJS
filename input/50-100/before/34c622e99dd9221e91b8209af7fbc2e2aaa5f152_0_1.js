function close_comment_form(div) {
    if(div.find('.add_comment').is(':visible')) {
        div.find('.add_comment').slideUp(400, function() {
            $(this).empty();
        });
    } else {
        div.find('.message').css('height', '100').html(div.data('message'));
        div.find('.message_toggle').show();
    }
}
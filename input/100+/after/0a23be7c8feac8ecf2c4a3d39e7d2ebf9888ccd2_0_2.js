function close_comment_form(div) {
    div.find('.add_comment').slideUp(400, function() {
        $(this).empty();
    });
}
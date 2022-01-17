function initMessageToggle() {
    $('.message_toggle').toggle(function() {
        var m = $(this).siblings('.message').html();
        var s = $(this).siblings('.orig_message').html();
        $(this).siblings('.message').html(s);
        $(this).siblings('.orig_message').html(m);
        $(this).text('[ Less ]');
    }, function() {
        var m = $(this).siblings('.message').html();
        var s = $(this).siblings('.orig_message').html();
        $(this).siblings('.message').html(s);
        $(this).siblings('.orig_message').html(m);
        $(this).text('[ More ]');
    });
}
function messageEventListener() {
    if ($('#message').size() > 0 && $('#counter').empty().size() > 0) {
        var length = $('#message').val().length;
        $('#counter').text(length);
        if (length > 2000) {
            $('#counter').css('color', 'red');
        } else if (length > 140) {
            $('#counter').css('color', 'green');
        } else {
            $('#counter').css('color', 'gray');
        }
    }
}
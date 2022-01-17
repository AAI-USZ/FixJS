function error_popup(text) {
    $('body').prepend('<div class="form-error">' + text + '</div>');
    $('.form-error').center().fadeOut(5000)
        .click( function() { $(this).stop().fadeOut('fast') } );
}
function() {
    
    // tinychat
    $('.tinychat_embed').css({
        'height': '85%',
        'margin-top': '3%'
    });

    updateChat();
    bindReplyButton();
    formatJsMaximizeButton();

    // Hi(A)ja(x)ck form
    $('#chatt-form-post').submit(function(event) {
        event.preventDefault();

        var form = $(this),
        formData = form.serialize();

        $.ajax({
            type: "POST",
            url: form.attr('action'),
            cache: false,
            data: formData,
            beforeSend: function() {
                $('#chatt-form-post textarea, #chatt-form-post input').prop('disabled', true);
                clearInterval(auto_refresh);
            },
            statusCode: {
                200: function(data) {
                    $('#chatt-form-post textarea').val('');
                    updateChat();
                    auto_refresh = setInterval(function() {
                        if ($('#autoupdate').is(':checked')) {
                            updateChat();
                        }
                    }, 10000);
                    // refresh every 10000 milliseconds
                    }
            },
            error: function(data) {
                console.log(data);
                $('#chatt-form-post textarea, #chatt-form-post input').prop('disabled', false);
            }
        });
        return false;

    });

    // Auto update
    var auto_refresh = setInterval(function() {
        if ($('#autoupdate').is(':checked')) {
            updateChat();
        }
    }, 10000);
    // refresh every 10000 milliseconds
    $("#autoupdate").button();
    $('#switcher').themeswitcher();
}
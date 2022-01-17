function() {

    formatJsMaximizeButton();
    formatJsConversationButton();
    formatJsDeleteGuestbookButton();
    formatJsReplyGuestbookButton();



    //Ajaxifiera formulären
    $("body").on("submit", "form.form-add-entry", function(event) {
        event.preventDefault();

        var form = $(this),
            url = form.attr('action'),
            formdata = form.serialize(),
            button = form.find('input[type=submit]'),
            loader = $('&nbsp;<img src="/static/img/ajax-loader.gif" class="gif-submit-loader" alt="Wakawakawakawakawaka..." />'),
            form_inputs = form.find('input, textarea'),
            form_wrapper = $('#guestbook-form-wrapper');

        form_inputs.attr('disabled', 'disabled');
        button.parent().append( loader );
        

        $.ajax({
            type: "POST",
            url: url,
            data: formdata,
            success: function(data, textStatus, jqXHR) {
                $.jGrowl('Meddelande skickat!');
                loader.remove();

                // Återställer formuläret
                form_inputs.removeAttr('disabled');
                form.find('textarea').val('');
                form.appendTo( form_wrapper );

                $('#guestbook-entries').html(data);
                formatJsConversationButton();
                formatJsDeleteGuestbookButton();
                formatJsReplyGuestbookButton();
                formatPagnation();
                $('.buttonset').buttonset();

            }
        });

        return false;
    });

}
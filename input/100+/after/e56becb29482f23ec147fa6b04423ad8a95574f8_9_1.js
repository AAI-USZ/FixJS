function() {
    // Formatera jQuery UI grejer
    formatjQueryUI();

    // Formatera jQuery UI grejer efter ajaxComplete
    $('body').ajaxComplete(function() {
        formatjQueryUI();
    });

    //Ajaxifiera formulären
    $("body").on("submit", "form", function(event) {
        event.preventDefault();

        var form = $(this),
            url = form.attr('action'),
            data = form.serialize(),
            ajaxloader = form.find('input[type=submit]');

        form.find('input').attr('disabled', 'disabled');
        ajaxloader.after( $('&nbsp;<img src="/static/img/ajax-loader.gif" class="gif-submit-loader" alt="Wakawakawakawakawaka..." />') );

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "html",
            success: function(data, textStatus, jqXHR) {
                if ( jqXHR.status === 278 ) {
                    window.location.href = jqXHR.getResponseHeader("Location");
                }
                else {
                    form.replaceWith(data);
                }
            }
        });

        return false;
    });
    $('#switcher').themeswitcher();
}
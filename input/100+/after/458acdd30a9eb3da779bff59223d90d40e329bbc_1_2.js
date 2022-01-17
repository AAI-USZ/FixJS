function error_popup(type, text) {
    var cssClass = '.form-popup-' + type;
    function hide() {
        $(cssClass).slideUp(200, function() {
                $(this).remove();
            });
    }

    hide();
    $('h1').after(format('error-popup', {'type': type, 'text': text}));
    $(cssClass).center().slideDown(200);
    $(cssClass + ' span').click(hide);
}
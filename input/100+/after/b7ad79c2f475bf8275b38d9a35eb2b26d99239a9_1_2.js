function () {
    var button = jQuery(this),
        editor = button.data("editor"),
        code   = noEditor ? editor : editor.getSession().getValue(), // if using ACE get the current code, else use the value of <code>
        output = button.data('output');

    output.empty();
    setTimeout(function () {
        var $output = 'jQuery("#' + output[0].id + '")',
            $alert  = 'function (msg) {' + $output + '.append("alert: " + msg + "</br/>");}';

        // Add an remove a class when the code is run.
        output.addClass('loaded');
        setTimeout(function () {
            output.removeClass('loaded');
        }, 1500);

        // Execute the code in a custom scope that includes alert() and $output.
        jQuery.globalEval('(function ($output, alert) {' + code + '})(' + $output + ', ' + $alert + ')');
    }, 300);
}
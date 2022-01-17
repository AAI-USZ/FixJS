function () {
    var initialize = function() {
        // This function will initialize the support for copy, if copy is defined for the pane.  In katello, one
        // example of this can be found in app/views/system_groups/_tupane_header.html.haml.

        var copy_link = $('.pane_action.copy-tipsy');
        if(copy_link) {
            var cancel_button = $('#cancel_copy_button'), copy_form = $('#copy_form');

            KT.tipsy.custom.copy_tooltip(copy_link);

            copy_link.die();
            copy_link.live('click', show_form);

            cancel_button.die();
            cancel_button.live('click', hide_form);

            copy_form.die();
            copy_form.live('submit', perform_copy);
        }
    },
    show_form = function() {
        $('.pane_action.copy-tipsy').tipsy('show');
    },
    hide_form = function() {
        $('.pane_action.copy-tipsy').tipsy('hide');
    },
    perform_copy = function(event) {
        event.preventDefault();

        var copy_form = $('#copy_form'), copy_button = $('#copy_button'), do_not_open = $('#do_not_open').is(':checked');
        copy_button.attr('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: copy_form.data("url") + "?&authenticity_token=" + AUTH_TOKEN,
            data: copy_form.serialize(),
            cache: false,
            success: function(data) {
                $('.pane_action.copy-tipsy').tipsy('hide');

                if (do_not_open) {
                    list.add(data);
                } else {
                    KT.panel.list.createSuccess(data);
                }
            },
            error: function(data) {
                copy_button.removeAttr('disabled');
            }
        });
        return false;
    };
    return {
        initialize: initialize,
        perform_copy: perform_copy
    };

}
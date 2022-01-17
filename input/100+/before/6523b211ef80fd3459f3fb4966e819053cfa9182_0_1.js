function () {

    var data_changed = false;
    var message = $labelLeavePageConfirmation;
    var mark_class = ".script-confirm-unsaved";
    var allowed_transitions = "input[type=submit]";

    $(window).bind('beforeunload', function () {
        if (data_changed) return message;
    });

    $("input" + mark_class + ", textarea" + mark_class).live('change keypress', function (event) {
        data_changed = true;
    });

    $(allowed_transitions).live('click', function(event) {
        $(window).off('beforeunload');
    });
}
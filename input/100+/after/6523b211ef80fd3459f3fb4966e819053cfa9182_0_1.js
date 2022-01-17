function () {

    var data_changed = false;
    var message = $labelLeavePageConfirmation;
    var mark_class = ".script-confirm-unsaved";
    var allowed_transitions = "input[type=submit]";
    var currentData = "";
    var newData;

    $(window).bind('beforeunload', function () {
        newData = "";
        $("input" + mark_class + ", textarea" + mark_class).each(function () {
            newData += this.value;
        });
        if (currentData != newData) return message;
    });

    $(allowed_transitions).live('click', function (event) {
        $(window).off('beforeunload');
    });

    $("input" + mark_class + ", textarea" + mark_class).each(function () {
        currentData += this.value;
    });


}
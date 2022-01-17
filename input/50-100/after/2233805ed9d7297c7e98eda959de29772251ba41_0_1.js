function() {
    if ($('tracker_reminder')) {
        $('tracker_reminder').show();
        $('add_reminder').observe('click', function (evt) {
            var url = codendi.tracker.base_url +'?func=display_reminder_form&tracker='+$('add_reminder').value;
            new Ajax.Updater($('tracker_reminder'), url, {method: 'get'});
        });
    }
}
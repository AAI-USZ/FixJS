function() {
    $('tracker_reminder').show();
    $('add_reminder').observe('click', function (evt) {
    var url = codendi.tracker.base_url +'?func=display_reminder_form&tracker='+$('add_reminder').value;
    var target = 'tracker_reminder';
    var myAjax = new Ajax.Updater(target, url, {method: 'get'});
    });
}
function (evt) {
    if (!evt
        || !evt.source
        || evt.source.action === undefined
        || (evt.source.target === undefined && evt.source.text === undefined))
        return;
    var action = evt.source.action;
    var target = evt.source.target || evt.source.text;
    var cleanTarget = target.split('\n').join(' ');
    if (cleanTarget.indexOf('http') == 0) {
        action = '';
    }
    if (action == 'tel://') {
        //cleanTarget = cleanTarget.replace(/[\\(\\)\\.-\\ ]/g, '');
    }

    var together = action + cleanTarget;
    if (!Ti.Platform.canOpenURL(together)) {
        Ti.UI.Clipboard.setText(cleanTarget);
        Ti.UI.createAlertDialog({
            title: 'Copied to Clipboard!',
            message: cleanTarget
        }).show();
    }
    else {
        var appName = 'External Application';
        if (together.split('maps.google.com').length > 1) {
            appName = 'Google Maps';
        }
        else if (together.split('http://').length > 1) {
            appName = 'Safari';
        }
        else if (action == 'tel://') {
            appName = 'Phone';
        }
        else if (action == 'mailto://') {
            appName = 'Mail';
        }
        exports.confirm({
            title: 'Launching ' + appName,
            message: 'Are you sure?',
            callback: function () {
                Ti.Platform.openURL(action + cleanTarget);
                action = cleanTarget = null;

            }
        });
    }

    evt = null;
}
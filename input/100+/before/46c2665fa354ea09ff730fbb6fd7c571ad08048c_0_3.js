function(evt) {
    if (!evt || !evt.source || evt.source.action === undefined || evt.source.target === undefined && evt.source.text === undefined) return;
    var action = evt.source.action, target = evt.source.target || evt.source.text, cleanTarget = target.split("\n").join(" ");
    cleanTarget.indexOf("http") == 0 && (action = ""), action != "tel://";
    var together = action + cleanTarget;
    if (!Ti.Platform.canOpenURL(together)) Ti.UI.Clipboard.setText(cleanTarget), Ti.UI.createAlertDialog({
        title: "Copied to Clipboard!",
        message: cleanTarget
    }).show(); else {
        var appName = "External Application";
        together.split("maps.google.com").length > 1 ? appName = "Google Maps" : together.split("http://").length > 1 ? appName = "Safari" : action == "tel://" ? appName = "Phone" : action == "mailto://" && (appName = "Mail"), exports.confirm({
            title: "Launching " + appName,
            message: "Are you sure?",
            callback: function() {
                Ti.Platform.openURL(action + cleanTarget), action = cleanTarget = null;
            }
        });
    }
    evt = null;
}
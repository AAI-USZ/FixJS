function (aIsClosing) {
    debug("onCommandSave: aIsClosing: " + aIsClosing);
    if (aIsClosing) {
	var dialog = document.getElementById("calendar-event-dialog");
	var classification = { security: dialog._security,
			       privacy: dialog._privacy };

	if (!classification.security) {
	    debug("onCommandSave: asking for classification");
	    classification = askForClassification(window);
	    dialog._security = classification.security;
	    dialog._privacy = classification.privacy;
	}
	debug("onCommandSave: updating title");
	updateTitle();

	if (classification.security) {
	    debug("calling origonCommandSave");
	    return origonCommandSave(aIsClosing);
	}
    } else {
	debug("calling origonCommandSave");
	return origonCommandSave(aIsClosing);
    }
}
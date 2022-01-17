function _titleChanged() {
    var dialog = document.getElementById("calendar-event-dialog");

    debug("title changed");

    if (!dialog._security) {
	// extract any existing security + privacy classification
	var title = document.getElementById("item-title").value;

	classification = extractClassification(title);
	debug("trying to extract classification from title: " + title);
	/* indexOf returns -1 if not found, and starts at 0 if found,
	 * but our list has 0 as empty element so incrementing for all
	 * cases is fine */
	var i = Prefs["security-markings"].indexOf(classification.security) + 1;
	/* is a valid security marker */
	document.getElementById("security-list").selectedIndex = i;
	if (i >= 0) {
	    setSecurity(classification.security);
	} else {
	    setSecurity(null);
	}
	/* indexOf returns -1 if not found, and starts at 0 if found,
	 * but our list has 0 as empty element so incrementing for all
	 * cases is fine */
	i = Prefs["privacy-markings"].indexOf(classification.privacy) + 1;
	/* is a valid privacy marker */
	document.getElementById("privacy-list").selectedIndex = i;
	if (i >= 0) {
	    setPrivacy(classification.privacy);
	} else{
	    setPrivacy(null);
	}
    }
    debug("_titleChanged: updating title");
    _updateTitle();
    return true;
}
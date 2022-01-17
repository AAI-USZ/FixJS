function setSecurity (security) {
    var dialog = document.getElementById("calendar-event-dialog");
    // update our copy
    dialog._security = security;
    debug("setSecurity: " + security);
    updateTitle();

    var privacyList = document.getElementById("privacy-list");
    /* clear privacy list if no security selected */
    if (!security) {
	privacyList.selectedIndex = 0;
	setPrivacy(null);
    }
    privacyList.disabled = (security == null);
}
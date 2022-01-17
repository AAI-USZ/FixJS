function setPrivacy (privacy) {
    var dialog = document.getElementById("calendar-event-dialog");
    // update our copy
    dialog._privacy = privacy;
    debug("setPrivacy: " + privacy);
    updateTitle();
}
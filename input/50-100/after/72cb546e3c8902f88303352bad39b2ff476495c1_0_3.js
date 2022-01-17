function initDialog() {
    var securityList = document.getElementById("security-list");
    var privacyList = document.getElementById("privacy-list");

    setupLists(securityList, privacyList);
    /* disable privacyList until a security marking is selected */
    privacyList.disabled = true;

    // try to extract any existing classification
    var dialog = document.getElementById("calendar-event-dialog");
    dialog._security = null;
    dialog._privacy = null;
    _titleChanged();

    // watch for manual changes to title to enforce our
    // classification
    var itemTitle = document.getElementById("item-title");
    itemTitle.addEventListener("change", _titleChanged, true);
}
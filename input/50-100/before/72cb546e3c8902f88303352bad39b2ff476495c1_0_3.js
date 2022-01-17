function initDialog() {
    var securityList = document.getElementById("security-list");
    var privacyList = document.getElementById("privacy-list");

    setupLists(securityList, privacyList);
    /* disable privacyList until a security marking is selected */
    privacyList.disabled = true;

    // watch for manual changes to title to enforce our
    // classification
    var itemTitle = document.getElementById("item-title");
    itemTitle.addEventListener("change", titleChanged, true);
}
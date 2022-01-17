function (e) {
    var el = jq('#searchtext', document),
        len = el.val().length;

    // Show the clear button when there is text in the search field
    if (len > 0) {
        jq('#clear-btn', document).show();
    }

    // Activate search when we have enough input and either livesearch is
    // enabled or the user explicitly pressed Enter.
    if (len >= 3 && (this.tinyMCEPopup.editor.settings.livesearch === true || e.which === 13)) {
        this.is_search_activated = true;
        this.getFolderListing(this.tinyMCEPopup.editor.settings.navigation_root_url, this.method_search);
    }

    // Disable search when we have no input or the user explicitly pressed the
    // Escape key.
    if ((len === 0 && this.is_search_activated) || e.which === 27) {
        this.is_search_activated = false;
        el.val('');
        this.getCurrentFolderListing();
        jq('#clear-btn', document).hide();
    }
}
function addClickListeners() {
    
    $j('#listpage #footer #gear').unbind().touch(
        function(e) {
            e.preventDefault();
            splitView.focusOutContactList();
            setTimeout(SettingsManager.show, 10);
        });
    
    $j('#listpage #footer #home').unbind().touch(
        function(e) {
            e.preventDefault();
            splitView.focusOutContactList();
            showContactNews(null, true);
        });
}